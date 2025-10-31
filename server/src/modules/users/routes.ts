import { Router } from 'express';
import { UserController } from './user.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { adminMiddleware } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { createUserSchema, updateUserSchema, loginSchema } from '../../schemas/user.schema.js';

const router = Router();
const controller = new UserController();

// Público
router.post('/register', validate(createUserSchema), controller.register.bind(controller));
router.post('/login', validate(loginSchema), controller.login.bind(controller));

// Protegido
router.get('/profile', authMiddleware, controller.getProfile.bind(controller));

// Admin
router.get('/', authMiddleware, adminMiddleware, controller.getAll.bind(controller));
router.get('/:id', authMiddleware, adminMiddleware, controller.getById.bind(controller));
router.put('/:id', authMiddleware, validate(updateUserSchema), controller.update.bind(controller));
router.delete('/:id', authMiddleware, adminMiddleware, controller.delete.bind(controller));

export { router as usersRouter };
