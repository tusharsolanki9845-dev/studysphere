/**
 * Minimal Turso (libSQL) client over the documented SQL-over-HTTP API (/v2/pipeline).
 * Uses fetch only, so there is no native driver to install and it runs on any free Node host.
 * Free plan (checked Sep 2026): 5 GB storage, 500M row reads and 10M row writes per month, no sleeping.
 */
export type RemoteKind = 'note' | 'pyq' | 'contact';

export interface RemoteItem {
  id: string;
  kind: RemoteKind;
  json: string;
}

interface Stmt {
  sql: string;
  args?: string[];
}

export class TursoClient {
  private readonly endpoint: string;

  constructor(url: string, private readonly token: string) {
    const base = url.replace(/^libsql:\/\//, 'https://').replace(/\/+$/, '');
    this.endpoint = `${base}/v2/pipeline`;
  }

  static fromEnv(): TursoClient | null {
    const url = process.env.TURSO_DATABASE_URL?.trim();
    const token = process.env.TURSO_AUTH_TOKEN?.trim();
    return url && token ? new TursoClient(url, token) : null;
  }

  private async pipeline(stmts: Stmt[]): Promise<Array<{ rows: Array<Array<{ value?: string }>> }>> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10_000);
    try {
      const res = await fetch(this.endpoint, {
        method: 'POST',
        headers: { Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requests: [
            ...stmts.map((s) => ({
              type: 'execute',
              stmt: { sql: s.sql, ...(s.args ? { args: s.args.map((value) => ({ type: 'text', value })) } : {}) },
            })),
            { type: 'close' },
          ],
        }),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`Turso HTTP ${res.status}`);
      const data = (await res.json()) as {
        results?: Array<{ type: string; response?: { result?: { rows?: Array<Array<{ value?: string }>> } }; error?: { message?: string } }>;
      };
      const out: Array<{ rows: Array<Array<{ value?: string }>> }> = [];
      for (const r of data.results ?? []) {
        if (r.type === 'error') throw new Error(r.error?.message ?? 'Turso statement failed');
        if (r.type === 'ok' && r.response?.result) out.push({ rows: r.response.result.rows ?? [] });
      }
      return out;
    } finally {
      clearTimeout(timer);
    }
  }

  async ensureSchema(): Promise<void> {
    await this.pipeline([
      {
        sql: 'CREATE TABLE IF NOT EXISTS items (id TEXT PRIMARY KEY, kind TEXT NOT NULL, json TEXT NOT NULL, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)',
      },
    ]);
  }

  /** Newest first, matching the order the in-memory store keeps. */
  async loadAll(): Promise<RemoteItem[]> {
    const [res] = await this.pipeline([{ sql: 'SELECT id, kind, json FROM items ORDER BY rowid DESC' }]);
    return (res?.rows ?? []).map((r) => ({ id: r[0].value ?? '', kind: (r[1].value ?? 'note') as RemoteKind, json: r[2].value ?? '{}' }));
  }

  async upsert(item: RemoteItem): Promise<void> {
    await this.pipeline([
      {
        sql: 'INSERT INTO items (id, kind, json) VALUES (?, ?, ?) ON CONFLICT(id) DO UPDATE SET json = excluded.json, updated_at = CURRENT_TIMESTAMP',
        args: [item.id, item.kind, item.json],
      },
    ]);
  }

  async ping(): Promise<void> {
    await this.pipeline([{ sql: 'SELECT 1' }]);
  }
}
