import { pool } from '../../config/database.js';
import type { User, CreateUserInput, UpdateUserInput } from '../../types/index.js';

export class UserRepository {
  async findAll(): Promise<User[]> {
    const result = await pool.query<User>(
      'SELECT id, email, password_hash, full_name, role, phone, created_at, updated_at FROM core.users ORDER BY created_at DESC'
    );
    return result.rows;
  }

  async findById(id: string): Promise<User | null> {
    const result = await pool.query<User>(
      'SELECT id, email, password_hash, full_name, role, phone, created_at, updated_at FROM core.users WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query<User>(
      'SELECT id, email, password_hash, full_name, role, phone, created_at, updated_at FROM core.users WHERE email = $1',
      [email]
    );
    return result.rows[0] || null;
  }

  async create(data: CreateUserInput & { password_hash: string; role?: 'user' | 'admin' }): Promise<User> {
    const result = await pool.query<User>(
      `INSERT INTO core.users (email, password_hash, full_name, role, phone)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, email, password_hash, full_name, role, phone, created_at, updated_at`,
      [data.email, data.password_hash, data.full_name, data.role || 'user', data.phone || null]
    );
    return result.rows[0];
  }

  async update(id: string, data: UpdateUserInput): Promise<User | null> {
    const updates: string[] = [];
    const values: unknown[] = [];
    let paramCount = 1;

    if (data.full_name !== undefined) {
      updates.push(`full_name = $${paramCount++}`);
      values.push(data.full_name);
    }
    if (data.phone !== undefined) {
      updates.push(`phone = $${paramCount++}`);
      values.push(data.phone);
    }

    if (updates.length === 0) return this.findById(id);

    values.push(id);
    const result = await pool.query<User>(
      `UPDATE core.users SET ${updates.join(', ')}, updated_at = NOW()
       WHERE id = $${paramCount}
       RETURNING id, email, password_hash, full_name, role, phone, created_at, updated_at`,
      values
    );
    return result.rows[0] || null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await pool.query('DELETE FROM core.users WHERE id = $1', [id]);
    return result.rowCount !== null && result.rowCount > 0;
  }
}

