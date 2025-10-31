import { Router } from 'express';
import { ProductController } from './product.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { adminMiddleware } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { createProductSchema, updateProductSchema } from '../../schemas/product.schema.js';

const router = Router();
const controller = new ProductController();

// Público (lectura)
router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));

// Protegido (solo admin puede crear/editar/eliminar)
router.post('/', authMiddleware, adminMiddleware, validate(createProductSchema), controller.create.bind(controller));
router.put('/:id', authMiddleware, adminMiddleware, validate(updateProductSchema), controller.update.bind(controller));
router.delete('/:id', authMiddleware, adminMiddleware, controller.delete.bind(controller));

export { router as productsRouter };
