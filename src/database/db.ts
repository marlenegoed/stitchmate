import 'dotenv/config'

import {PostgresJsDatabase, drizzle} from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

export const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/stitchmate'
const sslCertificate = process.env.DATABASE_CERTIFICATE;

const sslConfig = {
  ca: [sslCertificate]
}
export const options = {
  prepare: false,
  ssl: sslCertificate ? sslConfig : undefined,
}

// Disable prefetch as it is not supported for "Transaction" pool mode
export const connection = postgres(connectionString, options)
// export const db = drizzle(connection, {schema});

// for development 
declare global {
  var db: PostgresJsDatabase<typeof schema> | undefined
}

let db: PostgresJsDatabase<typeof schema>

if (process.env.NODE_ENV === 'production') {
  db = drizzle(connection, {schema})
} else {
  if (!global.db) global.db = drizzle(connection, {schema})
  db = global.db
}

export {db}

