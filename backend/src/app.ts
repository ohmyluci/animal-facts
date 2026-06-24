import express from 'express';
import animalsRouter from './routes/animals';

const app = express();

app.use(express.json());
app.use('/api', animalsRouter);

export default app;
