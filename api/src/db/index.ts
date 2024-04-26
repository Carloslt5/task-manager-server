import { Client } from 'pg';

export const dbConfig =
  process.env.NODE_ENV === 'test'
    ? {
        host: 'localhost',
        database: 'postgres',
        port: 5432,
        user: 'postgres',
        password: 'postgres',
      }
    : {
        host: process.env.DATABASE_HOST || 'localhost',
        database: process.env.DATABASE_NAME || 'postgres',
        port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 5432,
        user: process.env.DATABASE_USER || 'postgres',
        password: process.env.DATABASE_PASSWORD || 'postgres',
      };

export async function connectDataBase() {
  const client = new Client(dbConfig);

  try {
    await client.connect();
    const result = await client.query('SELECT NOW()');
    console.log('✅ --------- Connected', result.rows[0]);
  } catch (error) {
    console.error('Error al conectar o consultar la base de datos:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}
