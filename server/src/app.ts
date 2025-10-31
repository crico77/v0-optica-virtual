import express, { Application } from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { apiRouter } from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFound.js';

export function createApp(): Application {
  const app = express();

  app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', name: 'optica-virtual-api', env: env.NODE_ENV });
  });

  app.get('/api', (_req, res) => {
    res.json({
      message: 'Óptica Virtual API',
      version: '1.0.0',
      endpoints: {
        auth: {
          'POST /api/users/register': 'Registrar nuevo usuario',
          'POST /api/users/login': 'Iniciar sesión',
          'GET /api/users/profile': 'Obtener perfil (requiere autenticación)'
        },
        users: {
          'GET /api/users': 'Listar usuarios (admin)',
          'GET /api/users/:id': 'Obtener usuario (admin)',
          'PUT /api/users/:id': 'Actualizar usuario',
          'DELETE /api/users/:id': 'Eliminar usuario (admin)'
        },
        products: {
          'GET /api/products': 'Listar productos (público)',
          'GET /api/products/:id': 'Obtener producto (público)',
          'POST /api/products': 'Crear producto (admin)',
          'PUT /api/products/:id': 'Actualizar producto (admin)',
          'DELETE /api/products/:id': 'Eliminar producto (admin)'
        },
        appointments: {
          'GET /api/appointments': 'Listar citas (requiere autenticación)',
          'GET /api/appointments/:id': 'Obtener cita (requiere autenticación)',
          'POST /api/appointments': 'Crear cita (requiere autenticación)',
          'PUT /api/appointments/:id': 'Actualizar cita (requiere autenticación)',
          'DELETE /api/appointments/:id': 'Eliminar cita (requiere autenticación)'
        }
      }
    });
  });

  app.use('/api', apiRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}


