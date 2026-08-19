import { setDefaultAutoSelectFamily } from 'net'
import { neon } from '@neondatabase/serverless'

setDefaultAutoSelectFamily(false)

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required. Load it from .env.local before running this script.')
}

const sql = neon(process.env.DATABASE_URL)

// Drop the outdated `bookings` table from the previous (incompatible) schema so it can be recreated to match src/lib/db/schema.ts
await sql`DROP TABLE IF EXISTS bookings CASCADE`

// ─── Enums ────────────────────────────────────────────────────────────────────
await sql`
  DO $$
  BEGIN
    CREATE TYPE booking_status AS ENUM ('PENDING','REVIEWING','QUOTED','CONFIRMED','CANCELLED','COMPLETED');
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$
`

// ─── Bookings ─────────────────────────────────────────────────────────────────
await sql`
  CREATE TABLE IF NOT EXISTS bookings (
    id serial PRIMARY KEY,
    ref_number varchar(20) NOT NULL UNIQUE,
    full_name varchar(120) NOT NULL,
    email varchar(120) NOT NULL,
    phone varchar(30) NOT NULL,
    event_type varchar(80) NOT NULL,
    event_date varchar(20) NOT NULL,
    preferred_time varchar(10) NOT NULL,
    guest_count integer NOT NULL,
    location text NOT NULL,
    budget_range varchar(60),
    cuisine_prefs text,
    dietary_reqs text,
    special_requests text,
    status booking_status NOT NULL DEFAULT 'PENDING',
    notes text,
    quoted_amount integer,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL DEFAULT now()
  )
`

// ─── Contact messages ─────────────────────────────────────────────────────────
await sql`
  CREATE TABLE IF NOT EXISTS contact_messages (
    id serial PRIMARY KEY,
    name varchar(120) NOT NULL,
    email varchar(120) NOT NULL,
    phone varchar(30),
    subject varchar(200) NOT NULL,
    message text NOT NULL,
    read boolean NOT NULL DEFAULT false,
    created_at timestamp NOT NULL DEFAULT now()
  )
`

// ─── Menu items ───────────────────────────────────────────────────────────────
await sql`
  CREATE TABLE IF NOT EXISTS menu_items (
    id serial PRIMARY KEY,
    name varchar(120) NOT NULL,
    category varchar(40) NOT NULL,
    description text NOT NULL,
    price integer NOT NULL,
    image text,
    ingredients text,
    allergens text,
    dietary text,
    available boolean NOT NULL DEFAULT true,
    chef_pick boolean NOT NULL DEFAULT false,
    created_at timestamp NOT NULL DEFAULT now()
  )
`

// ─── Gallery images ───────────────────────────────────────────────────────────
await sql`
  CREATE TABLE IF NOT EXISTS gallery_images (
    id serial PRIMARY KEY,
    src text NOT NULL,
    alt text NOT NULL,
    caption varchar(200),
    category varchar(40) NOT NULL,
    created_at timestamp NOT NULL DEFAULT now()
  )
`

// ─── Testimonials ─────────────────────────────────────────────────────────────
await sql`
  CREATE TABLE IF NOT EXISTS testimonials (
    id serial PRIMARY KEY,
    name varchar(120) NOT NULL,
    role varchar(120) NOT NULL,
    rating integer NOT NULL,
    text text NOT NULL,
    service varchar(80) NOT NULL,
    date varchar(30) NOT NULL,
    featured boolean NOT NULL DEFAULT false
  )
`

// ─── Blog posts ───────────────────────────────────────────────────────────────
await sql`
  CREATE TABLE IF NOT EXISTS blog_posts (
    id serial PRIMARY KEY,
    slug varchar(200) NOT NULL UNIQUE,
    title varchar(200) NOT NULL,
    excerpt text NOT NULL,
    image text,
    category varchar(60) NOT NULL,
    author varchar(80) NOT NULL DEFAULT 'Chef Harrizona',
    published_at varchar(20) NOT NULL,
    read_time integer NOT NULL DEFAULT 5,
    featured boolean NOT NULL DEFAULT false,
    draft boolean NOT NULL DEFAULT false
  )
`

// ─── Site settings ────────────────────────────────────────────────────────────
await sql`
  CREATE TABLE IF NOT EXISTS site_settings (
    id serial PRIMARY KEY,
    key varchar(80) NOT NULL UNIQUE,
    value text NOT NULL
  )
`

// ─── Customer reviews (used by POST /api/reviews) ─────────────────────────────
await sql`
  CREATE TABLE IF NOT EXISTS customer_reviews (
    id text PRIMARY KEY,
    name text NOT NULL,
    service text NOT NULL,
    rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
    review text NOT NULL,
    approved boolean NOT NULL DEFAULT false,
    created_at timestamptz NOT NULL DEFAULT now()
  )
`

const tables = await sql`
  SELECT table_name FROM information_schema.tables
  WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
  ORDER BY table_name
`

console.log('Neon database ready. Tables created:')
for (const t of tables) console.log(`  - ${t.table_name}`)
