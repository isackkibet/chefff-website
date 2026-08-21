import 'server-only'
import { setDefaultAutoSelectFamily } from 'net'
import { neon } from '@neondatabase/serverless'

setDefaultAutoSelectFamily(false)

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL is not configured.')
}

export const sql = neon(connectionString)

let schemaPromise: Promise<void> | undefined

/** Creates the database table on first use, so a fresh Neon project works immediately. */
export function ensureDatabaseSchema() {
  schemaPromise ??= sql`
    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      ref_number TEXT NOT NULL UNIQUE,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      event_type TEXT NOT NULL,
      event_date DATE NOT NULL,
      preferred_time TEXT NOT NULL,
      guest_count INTEGER NOT NULL CHECK (guest_count > 0),
      location TEXT NOT NULL,
      budget_range TEXT,
      cuisine_prefs TEXT,
      dietary_reqs TEXT,
      special_requests TEXT,
      status TEXT NOT NULL DEFAULT 'PENDING',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `.then(() => undefined)

  return schemaPromise
}

let reviewsSchemaPromise: Promise<void> | undefined

/** Stores customer-submitted reviews separately until they are approved. */
export function ensureReviewsSchema() {
  reviewsSchemaPromise ??= sql`
    CREATE TABLE IF NOT EXISTS customer_reviews (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      service TEXT NOT NULL,
      rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
      review TEXT NOT NULL,
      approved BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `.then(() => undefined)

  return reviewsSchemaPromise
}
