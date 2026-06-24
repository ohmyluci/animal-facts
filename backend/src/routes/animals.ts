import { Router } from 'express';
import { getAnimals } from '../controllers/animalsController';

const router = Router();

router.get('/animals', getAnimals);

export default router;
