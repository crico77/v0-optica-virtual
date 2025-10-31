import { Router } from 'express';

// Rutas de módulos (placeholder por ahora)
import { usersRouter } from '../modules/users/routes.js';
import { productsRouter } from '../modules/products/routes.js';
import { appointmentsRouter } from '../modules/appointments/routes.js';

export const apiRouter = Router();

apiRouter.use('/users', usersRouter);
apiRouter.use('/products', productsRouter);
apiRouter.use('/appointments', appointmentsRouter);


