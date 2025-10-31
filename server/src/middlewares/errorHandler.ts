import { NextFunction, Request, Response } from 'express';

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  // eslint-disable-next-line no-console
  console.error('Error:', err);

  if (err instanceof Error) {
    if (err.message.includes('violates foreign key constraint')) {
      res.status(400).json({ error: 'Referencia inválida. El recurso relacionado no existe' });
      return;
    }
    if (err.message.includes('duplicate key value')) {
      res.status(409).json({ error: 'El recurso ya existe' });
      return;
    }
    res.status(500).json({ error: err.message });
    return;
  }

  res.status(500).json({ error: 'Error interno del servidor' });
}
