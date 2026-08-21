/**
 * Run once to create all tables in Neon.
 *   npx tsx scripts/migrate.ts
 */
import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error("DATABASE_URL is not set in .env.local");

const sql = neon(DATABASE_URL);

async function migrate() {
  console.log("Running migrations…");

  await sql`
    DO $$ BEGIN
      CREATE TYPE booking_status AS ENUM (
        'PENDING','REVIEWING','QUOTED','CONFIRMED','CANCELLED','COMPLETED'
      );
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS bookings (
      id              SERIAL PRIMARY KEY,
      ref_number      VARCHAR(20)  NOT NULL UNIQUE,
      full_name       VARCHAR(120) NOT NULL,
      email           VARCHAR(120) NOT NULL,
      phone           VARCHAR(30)  NOT NULL,
      event_type      VARCHAR(80)  NOT NULL,
      event_date      VARCHAR(20)  NOT NULL,
      preferred_time  VARCHAR(10)  NOT NULL,
      guest_count     INTEGER      NOT NULL,
      location        TEXT         NOT NULL,
      budget_range    VARCHAR(60),
      cuisine_prefs   TEXT,
      dietary_reqs    TEXT,
      special_requests TEXT,
      status          booking_status NOT NULL DEFAULT 'PENDING',
      notes           TEXT,
      quoted_amount   INTEGER,
      created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
      updated_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id         SERIAL PRIMARY KEY,
      name       VARCHAR(120) NOT NULL,
      email      VARCHAR(120) NOT NULL,
      phone      VARCHAR(30),
      subject    VARCHAR(200) NOT NULL,
      message    TEXT         NOT NULL,
      read       BOOLEAN      NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS menu_items (
      id          SERIAL PRIMARY KEY,
      name        VARCHAR(120) NOT NULL,
      category    VARCHAR(40)  NOT NULL,
      description TEXT         NOT NULL,
      price       INTEGER      NOT NULL,
      image       TEXT,
      ingredients TEXT,
      allergens   TEXT,
      dietary     TEXT,
      available   BOOLEAN      NOT NULL DEFAULT TRUE,
      chef_pick   BOOLEAN      NOT NULL DEFAULT FALSE,
      created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS gallery_images (
      id         SERIAL PRIMARY KEY,
      src        TEXT         NOT NULL,
      alt        TEXT         NOT NULL,
      caption    VARCHAR(200),
      category   VARCHAR(40)  NOT NULL,
      created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS testimonials (
      id       SERIAL PRIMARY KEY,
      name     VARCHAR(120) NOT NULL,
      role     VARCHAR(120) NOT NULL,
      rating   INTEGER      NOT NULL,
      text     TEXT         NOT NULL,
      service  VARCHAR(80)  NOT NULL,
      date     VARCHAR(30)  NOT NULL,
      featured BOOLEAN      NOT NULL DEFAULT FALSE
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id           SERIAL PRIMARY KEY,
      slug         VARCHAR(200) NOT NULL UNIQUE,
      title        VARCHAR(200) NOT NULL,
      excerpt      TEXT         NOT NULL,
      image        TEXT,
      category     VARCHAR(60)  NOT NULL,
      author       VARCHAR(80)  NOT NULL DEFAULT 'Chef Harrizona',
      published_at VARCHAR(20)  NOT NULL,
      read_time    INTEGER      NOT NULL DEFAULT 5,
      featured     BOOLEAN      NOT NULL DEFAULT FALSE,
      draft        BOOLEAN      NOT NULL DEFAULT FALSE
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS site_settings (
      id    SERIAL PRIMARY KEY,
      key   VARCHAR(80) NOT NULL UNIQUE,
      value TEXT        NOT NULL
    );
  `;

  // Index for fast booking lookups
  await sql`
    CREATE INDEX IF NOT EXISTS idx_bookings_status    ON bookings(status);
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_bookings_created   ON bookings(created_at DESC);
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_contacts_created   ON contact_messages(created_at DESC);
  `;

  console.log("✓ All tables created successfully.");
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
