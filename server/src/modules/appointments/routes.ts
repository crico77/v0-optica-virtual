import { Router } from 'express';
import { AppointmentController } from './appointment.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { adminMiddleware } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { createAppointmentSchema, updateAppointmentSchema } from '../../schemas/appointment.schema.js';

const router = Router();
const controller = new AppointmentController();

// Todas las rutas requieren autenticación
router.get('/', authMiddleware, controller.getAll.bind(controller));
router.get('/:id', authMiddleware, controller.getById.bind(controller));
router.post('/', authMiddleware, validate(createAppointmentSchema), controller.create.bind(controller));
router.put('/:id', authMiddleware, validate(updateAppointmentSchema), controller.update.bind(controller));
router.delete('/:id', authMiddleware, controller.delete.bind(controller));

export { router as appointmentsRouter };
