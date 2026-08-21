import {
  pgTable, text, integer, boolean, timestamp, serial, varchar, pgEnum,
} from 'drizzle-orm/pg-core'

// ─── Enums ───────────────────────────────────────────────────────────────────
export const bookingStatusEnum = pgEnum('booking_status', [
  'PENDING', 'REVIEWING', 'QUOTED', 'CONFIRMED', 'CANCELLED', 'COMPLETED',
])

// ─── Bookings ─────────────────────────────────────────────────────────────────
export const bookings = pgTable('bookings', {
  id:              serial('id').primaryKey(),
  refNumber:       varchar('ref_number', { length: 20 }).notNull().unique(),
  fullName:        varchar('full_name', { length: 120 }).notNull(),
  email:           varchar('email', { length: 120 }).notNull(),
  phone:           varchar('phone', { length: 30 }).notNull(),
  eventType:       varchar('event_type', { length: 80 }).notNull(),
  eventDate:       varchar('event_date', { length: 20 }).notNull(),
  preferredTime:   varchar('preferred_time', { length: 10 }).notNull(),
  guestCount:      integer('guest_count').notNull(),
  location:        text('location').notNull(),
  budgetRange:     varchar('budget_range', { length: 60 }),
  cuisinePrefs:    text('cuisine_prefs'),
  dietaryReqs:     text('dietary_reqs'),
  specialRequests: text('special_requests'),
  status:          bookingStatusEnum('status').notNull().default('PENDING'),
  notes:           text('notes'),
  quotedAmount:    integer('quoted_amount'),
  aiReply:         text('ai_reply'),
  replyEmailedAt:  timestamp('reply_emailed_at'),
  createdAt:       timestamp('created_at').notNull().defaultNow(),
  updatedAt:       timestamp('updated_at').notNull().defaultNow(),
})

// ─── Contact messages ─────────────────────────────────────────────────────────
export const contactMessages = pgTable('contact_messages', {
  id:        serial('id').primaryKey(),
  name:      varchar('name', { length: 120 }).notNull(),
  email:     varchar('email', { length: 120 }).notNull(),
  phone:     varchar('phone', { length: 30 }),
  subject:   varchar('subject', { length: 200 }).notNull(),
  message:   text('message').notNull(),
  read:      boolean('read').notNull().default(false),
  aiReply:   text('ai_reply'),
  replyEmailedAt: timestamp('reply_emailed_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// ─── Menu items ───────────────────────────────────────────────────────────────
export const menuItems = pgTable('menu_items', {
  id:          serial('id').primaryKey(),
  name:        varchar('name', { length: 120 }).notNull(),
  category:    varchar('category', { length: 40 }).notNull(),
  description: text('description').notNull(),
  price:       integer('price').notNull(),          // in KES
  image:       text('image'),
  ingredients: text('ingredients'),                 // JSON array string
  allergens:   text('allergens'),                   // JSON array string
  dietary:     text('dietary'),                     // JSON array string
  available:   boolean('available').notNull().default(true),
  chefPick:    boolean('chef_pick').notNull().default(false),
  createdAt:   timestamp('created_at').notNull().defaultNow(),
})

// ─── Gallery images ───────────────────────────────────────────────────────────
export const galleryImages = pgTable('gallery_images', {
  id:        serial('id').primaryKey(),
  src:       text('src').notNull(),
  alt:       text('alt').notNull(),
  caption:   varchar('caption', { length: 200 }),
  category:  varchar('category', { length: 40 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// ─── Testimonials ─────────────────────────────────────────────────────────────
export const testimonials = pgTable('testimonials', {
  id:       serial('id').primaryKey(),
  name:     varchar('name', { length: 120 }).notNull(),
  role:     varchar('role', { length: 120 }).notNull(),
  rating:   integer('rating').notNull(),
  text:     text('text').notNull(),
  service:  varchar('service', { length: 80 }).notNull(),
  date:     varchar('date', { length: 30 }).notNull(),
  featured: boolean('featured').notNull().default(false),
})

// ─── Blog posts ───────────────────────────────────────────────────────────────
export const blogPosts = pgTable('blog_posts', {
  id:          serial('id').primaryKey(),
  slug:        varchar('slug', { length: 200 }).notNull().unique(),
  title:       varchar('title', { length: 200 }).notNull(),
  excerpt:     text('excerpt').notNull(),
  image:       text('image'),
  category:    varchar('category', { length: 60 }).notNull(),
  author:      varchar('author', { length: 80 }).notNull().default('Chef Harrizona'),
  publishedAt: varchar('published_at', { length: 20 }).notNull(),
  readTime:    integer('read_time').notNull().default(5),
  featured:    boolean('featured').notNull().default(false),
  draft:       boolean('draft').notNull().default(false),
})

// ─── Site settings ────────────────────────────────────────────────────────────
export const siteSettings = pgTable('site_settings', {
  id:    serial('id').primaryKey(),
  key:   varchar('key', { length: 80 }).notNull().unique(),
  value: text('value').notNull(),
})

// ─── Type exports ─────────────────────────────────────────────────────────────
export type Booking        = typeof bookings.$inferSelect
export type NewBooking     = typeof bookings.$inferInsert
export type ContactMessage = typeof contactMessages.$inferSelect
export type MenuItem       = typeof menuItems.$inferSelect
export type GalleryImage   = typeof galleryImages.$inferSelect
export type Testimonial    = typeof testimonials.$inferSelect
export type BlogPost        = typeof blogPosts.$inferSelect
