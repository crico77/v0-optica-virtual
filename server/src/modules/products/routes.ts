import { Router } from 'express';

export const productsRouter = Router();

productsRouter.get('/', (_req, res) => {
  res.json({ message: 'Listado de productos (placeholder)' });
});


