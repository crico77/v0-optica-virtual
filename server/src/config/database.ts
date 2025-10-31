import { Pool } from 'pg';
import { env } from './env.js';

export const pool = new Pool({ connectionString: env.DATABASE_URL });

export async function connectToDatabase(): Promise<void> {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT 1');
    if (result.rowCount !== 1) throw new Error('Conexión a PostgreSQL no verificada');
    // eslint-disable-next-line no-console
    console.log('Conectado a PostgreSQL');
  } finally {
    client.release();
  }
}
