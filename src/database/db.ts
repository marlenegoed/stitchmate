import 'dotenv/config'

import {drizzle} from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

export const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/stitchmate'

// Disable prefetch as it is not supported for "Transaction" pool mode
export const connection = postgres(connectionString, {prepare: false})
export const db = drizzle(connection);