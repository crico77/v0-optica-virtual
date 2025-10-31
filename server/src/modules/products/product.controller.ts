import { Request, Response } from 'express';
import { ProductService } from './product.service.js';
import type { AuthRequest } from '../../middlewares/auth.middleware.js';
import type { CreateProductInput, UpdateProductInput } from '../../types/index.js';

export class ProductController {
  private service = new ProductService();

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const { category_id } = req.query;
      const products = category_id
        ? await this.service.findByCategory(category_id as string)
        : await this.service.findAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener productos' });
    }
  }

  async getById(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const product = await this.service.findById(id);

      if (!product) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener producto' });
    }
  }

  async create(req: AuthRequest<unknown, unknown, CreateProductInput>, res: Response): Promise<void> {
    try {
      const product = await this.service.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : 'Error al crear producto' });
    }
  }

  async update(req: AuthRequest<{ id: string }, unknown, UpdateProductInput>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const product = await this.service.update(id, req.body);

      if (!product) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
      }

      res.json(product);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : 'Error al actualizar producto' });
    }
  }

  async delete(req: AuthRequest<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await this.service.delete(id);

      if (!deleted) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar producto' });
    }
  }
}

