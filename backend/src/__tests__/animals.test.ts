import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import request from 'supertest';
import { listAnimals } from '../services/animalsService';

jest.mock('../controllers/animalsController', () => ({
  getAnimals: (_req: unknown, res: { json: (data: unknown) => void }) => {
    res.json([
      { id: 'gallina', name: 'Gallina', scientificName: 'Gallus gallus domesticus' },
    ]);
  },
}));

import app from '../app';

describe('animalsService.listAnimals', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'animals-test-'));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true });
  });

  it('returns an empty array when there are no animal files', () => {
    expect(listAnimals(tmpDir)).toEqual([]);
  });

  it('ignores _schema.json', () => {
    fs.writeFileSync(
      path.join(tmpDir, '_schema.json'),
      JSON.stringify({ id: 'schema', name: 'Schema', scientificName: 'Schema' })
    );
    expect(listAnimals(tmpDir)).toEqual([]);
  });

  it('returns id, name and scientificName for each animal file', () => {
    const animal = { id: 'gallina', name: 'Gallina', scientificName: 'Gallus gallus domesticus', domains: [] };
    fs.writeFileSync(path.join(tmpDir, 'gallina.json'), JSON.stringify(animal));

    const result = listAnimals(tmpDir);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      id: 'gallinaca',
      name: 'Gallina',
      scientificName: 'Gallus gallus domesticus',
    });
  });
});

describe('GET /api/animals', () => {
  it('responds with 200 and an array of animal summaries', async () => {
    const res = await request(app).get('/api/animals');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
      scientificName: expect.any(String),
    });
  });
});
