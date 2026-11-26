import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { after, test } from 'node:test';

const originalCwd = process.cwd();
process.env.TURSO_DATABASE_URL = '';
process.env.TURSO_AUTH_TOKEN = '';
process.env.MAX_STORE_BYTES = '5242880';
const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'studysphere-store-'));
process.chdir(testDir);

// Import after changing cwd so the store's local persistence path stays inside
// this test's temporary directory and never touches a developer's real data.
const { catalogStore } = await import('../src/server/store');
const subjectCode = catalogStore.getCatalog().subjects[0]?.code ?? 'TEST';

const makeNote = (index: number) => ({
  id: `test-note-${index}`,
  title: `Concurrency test note ${index}`,
  subjectCode,
  authorName: 'StudySphere Test',
  license: 'CC BY-SA 4.0' as const,
  summary: 'A test note used to verify serialized writes.',
  contentMarkdown: 'This is a test note with enough content to persist safely.',
  featured: false,
  publishedAt: '2026-11-26',
});

test('serializes concurrent local writes without losing records', async () => {
  const before = catalogStore.getCatalog().notes.length;
  await Promise.all(Array.from({ length: 20 }, (_, index) => catalogStore.addNote(makeNote(index))));

  const after = catalogStore.getCatalog().notes.length;
  assert.equal(after, before + 20);

  const persistedPath = path.join(testDir, 'data', 'studysphere-store.json');
  const persisted = JSON.parse(fs.readFileSync(persistedPath, 'utf8')) as {
    catalog: { notes: Array<{ id: string }> };
  };
  assert.equal(persisted.catalog.notes.length, before + 20);
  assert.equal(persisted.catalog.notes.filter((note) => note.id.startsWith('test-note-')).length, 20);
});

test('persists PYQ and contact submissions through the same write queue', async () => {
  const subject = catalogStore.getCatalog().subjects[0];
  assert.ok(subject, 'seed catalog should include at least one subject');

  await catalogStore.addPyq({
    id: 'test-pyq-1',
    title: 'Test practice blueprint',
    subjectCode: subject.code,
    examYear: 2026,
    examSession: 'Odd Semester',
    paperType: 'Original Practice Blueprint',
    authorNote: 'Automated test fixture',
    sections: [],
    featured: false,
    publishedAt: '2026-11-26',
  });
  await catalogStore.addContactSubmission({
    id: 'test-contact-1',
    name: 'Test Contributor',
    email: 'test@example.invalid',
    category: 'General',
    message: 'Automated persistence test submission.',
    createdAt: '2026-11-26T00:00:00.000Z',
    status: 'new',
  });

  assert.ok(catalogStore.getCatalog().pyqs.some((paper) => paper.id === 'test-pyq-1'));
  const persisted = JSON.parse(
    fs.readFileSync(path.join(testDir, 'data', 'studysphere-store.json'), 'utf8')
  ) as { contacts: Array<{ id: string }> };
  assert.ok(persisted.contacts.some((contact) => contact.id === 'test-contact-1'));
});

after(() => {
  process.chdir(originalCwd);
  fs.rmSync(testDir, { recursive: true, force: true });
});
