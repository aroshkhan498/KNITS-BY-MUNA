import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from './schema';

const connectionString =
  process.env.POSTGRES_URL ??
  process.env.POSTGRES_URL_NON_POOLING ??
  process.env.DATABASE_URL;

const pool = new pg.Pool({
  connectionString,
  ssl: connectionString?.includes('localhost')
    ? false
    : { rejectUnauthorized: false },
});

export const db = drizzle(pool, { schema });
