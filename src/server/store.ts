import fs from 'fs';
import path from 'path';
import { INITIAL_CATALOG_DATA } from '../shared/seedData';
import type { CatalogData, ContactSubmission, PyqPaper, StudyNote } from '../shared/types';
import { TursoClient, type RemoteKind } from './remoteDb';

interface PersistedState {
  catalog: CatalogData;
  contacts: ContactSubmission[];
}

export class StorageQuotaError extends Error {
  readonly code = 'FREE_QUOTA_REACHED';
  constructor(message: string) {
    super(message);
    this.name = 'StorageQuotaError';
  }
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const STORE_FILE = path.resolve(DATA_DIR, 'studysphere-store.json');

const DEFAULT_MAX_STORE_BYTES = 5 * 1024 * 1024; // 5 MB local free-tier safeguard
const MAX_STORE_BYTES = (() => {
  const parsed = Number(process.env.MAX_STORE_BYTES);
  return Number.isFinite(parsed) && parsed >= 256 * 1024 ? parsed : DEFAULT_MAX_STORE_BYTES;
})();
const MAX_NOTES_COUNT = 2000;
const MAX_PYQS_COUNT = 2000;
const MAX_CONTACTS_COUNT = 1000;

function resolveAdsEnabled(): boolean {
  // Strictly disabled unless explicitly enabled by the owner via environment variable
  return process.env.ADS_ENABLED === 'true';
}

function cloneSeed(): CatalogData {
  const seed = JSON.parse(JSON.stringify(INITIAL_CATALOG_DATA)) as CatalogData;
  seed.settings.adsEnabled = resolveAdsEnabled();
  return seed;
}

/**
 * Portable repository abstraction.
 * Uses local JSON persistence in Node.js runtimes and can be swapped with
 * Cloudflare D1 / R2 free allowance without changing API route handlers.
 */
function mergeById<T extends { id: string }>(
  persisted: T[] | undefined,
  seed: T[],
  preferSeedOnIdMatch = false
): T[] {
  if (!Array.isArray(persisted) || persisted.length === 0) {
    return seed;
  }
  const seedMap = new Map(seed.map((item) => [item.id, item]));
  const result: T[] = [];
  const seen = new Set<string>();

  for (const item of persisted) {
    if (!item || typeof item.id !== 'string' || seen.has(item.id)) continue;
    seen.add(item.id);
    if (preferSeedOnIdMatch && seedMap.has(item.id)) {
      result.push(seedMap.get(item.id)!);
    } else {
      result.push(item);
    }
  }

  for (const item of seed) {
    if (!seen.has(item.id)) {
      seen.add(item.id);
      result.push(item);
    }
  }
  return result;
}

class CatalogStore {
  private state: PersistedState;
  private remote: TursoClient | null = TursoClient.fromEnv();
  private writeQueue: Promise<void> = Promise.resolve();

  constructor() {
    this.state = this.loadFromDisk();
  }

  /** Loads user-added content from the free Turso database when it is configured; otherwise keeps the local file. */
  async init(): Promise<void> {
    if (!this.remote) return;
    try {
      await this.remote.ensureSchema();
      const items = await this.remote.loadAll();
      const seed = cloneSeed();
      const parse = <T>(kind: RemoteKind): T[] =>
        items.filter((i) => i.kind === kind).flatMap((i) => {
          try {
            return [JSON.parse(i.json) as T];
          } catch {
            return [];
          }
        });
      this.state = {
        catalog: {
          ...seed,
          notes: mergeById(parse<StudyNote>('note'), seed.notes, false),
          pyqs: mergeById(parse<PyqPaper>('pyq'), seed.pyqs, false),
        },
        contacts: parse<ContactSubmission>('contact'),
      };
      console.log(`Database connected: loaded ${items.length} saved item(s) from Turso.`);
    } catch (err) {
      console.error('Turso unavailable, falling back to local file storage:', err);
      this.remote = null;
    }
  }

  persistence(): 'turso' | 'file' {
    return this.remote ? 'turso' : 'file';
  }


  private loadFromDisk(): PersistedState {
    const seed = cloneSeed();
    try {
      if (fs.existsSync(STORE_FILE)) {
        const raw = fs.readFileSync(STORE_FILE, 'utf-8');
        const parsed = JSON.parse(raw) as Partial<PersistedState>;
        if (parsed && parsed.catalog && Array.isArray(parsed.catalog.universities)) {
          return {
            catalog: {
              universities: mergeById(parsed.catalog.universities, seed.universities, true),
              courses: mergeById(parsed.catalog.courses, seed.courses, true),
              branches: mergeById(parsed.catalog.branches, seed.branches, true),
              subjects: mergeById(parsed.catalog.subjects, seed.subjects, true),
              notes: mergeById(parsed.catalog.notes, seed.notes, false),
              pyqs: mergeById(parsed.catalog.pyqs, seed.pyqs, false),
              announcements: mergeById(parsed.catalog.announcements, seed.announcements, true),
              settings: {
                adsEnabled: resolveAdsEnabled(),
                adNetworkSlotPrefix:
                  typeof parsed.catalog.settings?.adNetworkSlotPrefix === 'string'
                    ? parsed.catalog.settings.adNetworkSlotPrefix
                    : 'studysphere',
                platformNotice:
                  typeof parsed.catalog.settings?.platformNotice === 'string'
                    ? parsed.catalog.settings.platformNotice
                    : '',
              },
            },
            contacts: Array.isArray(parsed.contacts) ? parsed.contacts : [],
          };
        }
      }
    } catch {
      // Fallback cleanly to initial seed taxonomy
    }
    return {
      catalog: seed,
      contacts: [],
    };
  }

  private assertQuota(nextState: PersistedState): string {
    // Compact JSON serialization reduces disk footprint and speeds up reads.
    const serialized = JSON.stringify(nextState);
    const byteLength = Buffer.byteLength(serialized, 'utf-8');

    if (byteLength > MAX_STORE_BYTES) {
      throw new StorageQuotaError(
        'Free-tier storage quota reached. Existing academic data has been preserved and no paid upgrade was triggered. Please notify the site owner before adding larger uploads.'
      );
    }
    return serialized;
  }

  /** Persist first, then publish to in-memory state. Remote write failures must
   * reach the API caller instead of returning success for data that will vanish
   * on the next restart. */
  private async persistItem(
    kind: RemoteKind,
    item: { id: string },
    buildNextState: () => PersistedState
  ): Promise<void> {
    // Serialize mutations so simultaneous submissions cannot overwrite one
    // another with snapshots derived from the same older state.
    const operation = this.writeQueue.then(async () => {
      const nextState = buildNextState();
      const serialized = this.assertQuota(nextState);
      if (this.remote) {
        await this.remote.upsert({ id: item.id, kind, json: JSON.stringify(item) });
      } else {
        if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
        const tempFile = `${STORE_FILE}.tmp`;
        fs.writeFileSync(tempFile, serialized, 'utf-8');
        fs.renameSync(tempFile, STORE_FILE);
      }
      this.state = nextState;
    });
    this.writeQueue = operation.catch(() => undefined);
    await operation;
  }

  getCatalog(): CatalogData {
    return this.state.catalog;
  }

  async addNote(note: StudyNote): Promise<StudyNote> {
    await this.persistItem('note', note, () => {
      if (this.state.catalog.notes.length >= MAX_NOTES_COUNT) {
        throw new StorageQuotaError(
          'Free-tier study note capacity reached. Existing notes remain available and no paid upgrade was triggered.'
        );
      }
      return {
        ...this.state,
        catalog: {
          ...this.state.catalog,
          notes: [note, ...this.state.catalog.notes],
        },
      };
    });
    return note;
  }

  async addPyq(pyq: PyqPaper): Promise<PyqPaper> {
    await this.persistItem('pyq', pyq, () => {
      if (this.state.catalog.pyqs.length >= MAX_PYQS_COUNT) {
        throw new StorageQuotaError(
          'Free-tier PYQ blueprint capacity reached. Existing papers remain available and no paid storage upgrade was triggered.'
        );
      }
      return {
        ...this.state,
        catalog: {
          ...this.state.catalog,
          pyqs: [pyq, ...this.state.catalog.pyqs],
        },
      };
    });
    return pyq;
  }

  async addContactSubmission(submission: ContactSubmission): Promise<ContactSubmission> {
    await this.persistItem('contact', submission, () => {
      if (this.state.contacts.length >= MAX_CONTACTS_COUNT) {
        throw new StorageQuotaError(
          'Free-tier message queue limit reached. Existing records are preserved; please try again later.'
        );
      }
      return {
        ...this.state,
        contacts: [submission, ...this.state.contacts],
      };
    });
    return submission;
  }
}

export const catalogStore = new CatalogStore();
