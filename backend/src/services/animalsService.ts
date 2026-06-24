import * as fs from 'fs';
import * as path from 'path';

export interface AnimalSummary {
  id: string;
  name: string;
  scientificName: string;
}

export function listAnimals(dataDir: string): AnimalSummary[] {
  const files = fs
    .readdirSync(dataDir)
    .filter((f) => f.endsWith('.json') && f !== '_schema.json');

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(dataDir, file), 'utf-8');
    const data = JSON.parse(raw);
    return {
      id: data.id,
      name: data.name,
      scientificName: data.scientificName,
    };
  });
}
