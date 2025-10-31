import { ProductRepository } from './product.repository.js';
import type { Product, CreateProductInput, UpdateProductInput } from '../../types/index.js';

export class ProductService {
  private repository = new ProductRepository();

  async findAll(): Promise<Product[]> {
    return await this.repository.findAll();
  }

  async findById(id: string): Promise<Product | null> {
    return await this.repository.findById(id);
  }

  async findByCategory(categoryId: string): Promise<Product[]> {
    return await this.repository.findByCategory(categoryId);
  }

  async create(data: CreateProductInput): Promise<Product> {
    if (data.sku) {
      const existing = await this.repository.findAll();
      const skuExists = existing.some(p => p.sku === data.sku);
      if (skuExists) {
        throw new Error('El SKU ya existe');
      }
    }
    return await this.repository.create(data);
  }

  async update(id: string, data: UpdateProductInput): Promise<Product | null> {
    const existing = await this.repository.findById(id);
    if (!existing) return null;

    if (data.sku && data.sku !== existing.sku) {
      const allProducts = await this.repository.findAll();
      const skuExists = allProducts.some(p => p.sku === data.sku && p.id !== id);
      if (skuExists) {
        throw new Error('El SKU ya existe');
      }
    }

    return await this.repository.update(id, data);
  }

  async delete(id: string): Promise<boolean> {
    return await this.repository.delete(id);
  }
}

