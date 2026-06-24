import { Request, Response } from 'express';
import * as path from 'path';
import { listAnimals } from '../services/animalsService';

const DATA_DIR = path.resolve(__dirname, '../../../data/animals');

export function getAnimals(_req: Request, res: Response): void {
  const animals = listAnimals(DATA_DIR);
  res.json(animals);
}
