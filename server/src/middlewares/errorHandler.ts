import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  const status = 500;
  const message = err instanceof Error ? err.message : 'Error interno del servidor';
  res.status(status).json({ error: message });
}


