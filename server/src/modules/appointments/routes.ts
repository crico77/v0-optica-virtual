import { Router } from 'express';

export const appointmentsRouter = Router();

appointmentsRouter.get('/', (_req, res) => {
  res.json({ message: 'Listado de citas (placeholder)' });
});


