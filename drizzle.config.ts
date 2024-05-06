import 'dotenv/config';
import type {Config} from 'drizzle-kit';
import {connectionString} from '@/database/db';

export default {
  schema: './src/database/schema.ts',
  out: './drizzle',
  driver: 'pg', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    connectionString: connectionString
  },
} satisfies Config;