import { pool } from '../../config/database.js';
import type { Product, CreateProductInput, UpdateProductInput } from '../../types/index.js';

export class ProductRepository {
  async findAll(): Promise<Product[]> {
    const result = await pool.query<Product>(
      `SELECT id, name, description, sku, price_cents, currency, stock, category_id, image_url, created_at, updated_at
       FROM core.products
       ORDER BY created_at DESC`
    );
    return result.rows;
  }

  async findById(id: string): Promise<Product | null> {
    const result = await pool.query<Product>(
      `SELECT id, name, description, sku, price_cents, currency, stock, category_id, image_url, created_at, updated_at
       FROM core.products
       WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  async findByCategory(categoryId: string): Promise<Product[]> {
    const result = await pool.query<Product>(
      `SELECT id, name, description, sku, price_cents, currency, stock, category_id, image_url, created_at, updated_at
       FROM core.products
       WHERE category_id = $1
       ORDER BY created_at DESC`,
      [categoryId]
    );
    return result.rows;
  }

  async create(data: CreateProductInput): Promise<Product> {
    const result = await pool.query<Product>(
      `INSERT INTO core.products (name, description, sku, price_cents, currency, stock, category_id, image_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, name, description, sku, price_cents, currency, stock, category_id, image_url, created_at, updated_at`,
      [
        data.name,
        data.description || null,
        data.sku || null,
        data.price_cents,
        data.currency || 'USD',
        data.stock ?? 0,
        data.category_id || null,
        data.image_url || null
      ]
    );
    return result.rows[0];
  }

  async update(id: string, data: UpdateProductInput): Promise<Product | null> {
    const updates: string[] = [];
    const values: unknown[] = [];
    let paramCount = 1;

    if (data.name !== undefined) {
      updates.push(`name = $${paramCount++}`);
      values.push(data.name);
    }
    if (data.description !== undefined) {
      updates.push(`description = $${paramCount++}`);
      values.push(data.description || null);
    }
    if (data.sku !== undefined) {
      updates.push(`sku = $${paramCount++}`);
      values.push(data.sku || null);
    }
    if (data.price_cents !== undefined) {
      updates.push(`price_cents = $${paramCount++}`);
      values.push(data.price_cents);
    }
    if (data.currency !== undefined) {
      updates.push(`currency = $${paramCount++}`);
      values.push(data.currency);
    }
    if (data.stock !== undefined) {
      updates.push(`stock = $${paramCount++}`);
      values.push(data.stock);
    }
    if (data.category_id !== undefined) {
      updates.push(`category_id = $${paramCount++}`);
      values.push(data.category_id || null);
    }
    if (data.image_url !== undefined) {
      updates.push(`image_url = $${paramCount++}`);
      values.push(data.image_url || null);
    }

    if (updates.length === 0) return this.findById(id);

    values.push(id);
    const result = await pool.query<Product>(
      `UPDATE core.products SET ${updates.join(', ')}, updated_at = NOW()
       WHERE id = $${paramCount}
       RETURNING id, name, description, sku, price_cents, currency, stock, category_id, image_url, created_at, updated_at`,
      values
    );
    return result.rows[0] || null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await pool.query('DELETE FROM core.products WHERE id = $1', [id]);
    return result.rowCount !== null && result.rowCount > 0;
  }
}

