import dotenv from 'dotenv';

dotenv.config();

function requireEnv(name: string, defaultValue?: string): string {
  const value = process.env[name] ?? defaultValue;
  if (!value) {
    throw new Error(`Falta la variable de entorno ${name}`);
  }
  return value;
}

// Construir DATABASE_URL desde variables separadas o usar DATABASE_URL directamente
function getDatabaseUrl(): string {
  // Si existe DATABASE_URL, usarla directamente
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  // Si no, construir desde variables separadas
  const host = process.env.DB_HOST ?? 'localhost';
  const port = process.env.DB_PORT ?? '4200';
  const user = requireEnv('DB_USER');
  const password = requireEnv('DB_PASSWORD');
  const database = requireEnv('DB_NAME');
  const schema = process.env.DB_SCHEMA ?? 'core';

  return `postgres://${user}:${password}@${host}:${port}/${database}?schema=${schema}`;
}

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: parseInt(process.env.PORT ?? '4000', 10),
  DATABASE_URL: getDatabaseUrl(),
  JWT_SECRET: process.env.JWT_SECRET ?? 'dev_secret_cambiar_en_produccion',
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? 'http://localhost:3000'
};
