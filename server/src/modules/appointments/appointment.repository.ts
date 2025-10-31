import { pool } from '../../config/database.js';
import type { Appointment, CreateAppointmentInput, UpdateAppointmentInput } from '../../types/index.js';

export class AppointmentRepository {
  async findAll(): Promise<Appointment[]> {
    const result = await pool.query<Appointment>(
      `SELECT id, user_id, product_id, scheduled_at, status, notes, created_at, updated_at
       FROM core.appointments
       ORDER BY scheduled_at DESC`
    );
    return result.rows;
  }

  async findById(id: string): Promise<Appointment | null> {
    const result = await pool.query<Appointment>(
      `SELECT id, user_id, product_id, scheduled_at, status, notes, created_at, updated_at
       FROM core.appointments
       WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  async findByUserId(userId: string): Promise<Appointment[]> {
    const result = await pool.query<Appointment>(
      `SELECT id, user_id, product_id, scheduled_at, status, notes, created_at, updated_at
       FROM core.appointments
       WHERE user_id = $1
       ORDER BY scheduled_at DESC`,
      [userId]
    );
    return result.rows;
  }

  async create(userId: string, data: CreateAppointmentInput): Promise<Appointment> {
    const result = await pool.query<Appointment>(
      `INSERT INTO core.appointments (user_id, product_id, scheduled_at, status, notes)
       VALUES ($1, $2, $3, 'pending', $4)
       RETURNING id, user_id, product_id, scheduled_at, status, notes, created_at, updated_at`,
      [userId, data.product_id || null, data.scheduled_at, data.notes || null]
    );
    return result.rows[0];
  }

  async update(id: string, data: UpdateAppointmentInput): Promise<Appointment | null> {
    const updates: string[] = [];
    const values: unknown[] = [];
    let paramCount = 1;

    if (data.product_id !== undefined) {
      updates.push(`product_id = $${paramCount++}`);
      values.push(data.product_id || null);
    }
    if (data.scheduled_at !== undefined) {
      updates.push(`scheduled_at = $${paramCount++}`);
      values.push(data.scheduled_at);
    }
    if (data.status !== undefined) {
      updates.push(`status = $${paramCount++}`);
      values.push(data.status);
    }
    if (data.notes !== undefined) {
      updates.push(`notes = $${paramCount++}`);
      values.push(data.notes || null);
    }

    if (updates.length === 0) return this.findById(id);

    values.push(id);
    const result = await pool.query<Appointment>(
      `UPDATE core.appointments SET ${updates.join(', ')}, updated_at = NOW()
       WHERE id = $${paramCount}
       RETURNING id, user_id, product_id, scheduled_at, status, notes, created_at, updated_at`,
      values
    );
    return result.rows[0] || null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await pool.query('DELETE FROM core.appointments WHERE id = $1', [id]);
    return result.rowCount !== null && result.rowCount > 0;
  }
}

