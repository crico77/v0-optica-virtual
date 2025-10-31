import { createApp } from './app.js';
import { connectToDatabase } from './config/database.js';
import { env } from './config/env.js';

async function main(): Promise<void> {
  await connectToDatabase();
  const app = createApp();
  app.listen(env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`API escuchando en http://localhost:${env.PORT}`);
  });
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Error al iniciar el servidor:', error);
  process.exit(1);
});


