import mongoose from 'mongoose';
import { env } from './env.js';

export async function connectToDatabase(): Promise<void> {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(env.MONGODB_URI, {
    dbName: undefined
  });
  // eslint-disable-next-line no-console
  console.log('Conectado a MongoDB');
}


