import dotenv from 'dotenv';

dotenv.config();

function requireEnv(name: string, defaultValue?: string): string {
  const value = process.env[name] ?? defaultValue;
  if (!value) {
    throw new Error(`Falta la variable de entorno ${name}`);
  }
  return value;
}

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: parseInt(process.env.PORT ?? '4000', 10),
  MONGODB_URI: requireEnv('MONGODB_URI', 'mongodb://127.0.0.1:27017/optica_virtual'),
  JWT_SECRET: requireEnv('JWT_SECRET', 'dev_secret_cambia_esto'),
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? '*'
};


