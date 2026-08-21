/**
 * Admin data store, mock in-memory state for demo purposes.
 * In production every write/read would go through API routes
 * backed by PostgreSQL + Prisma.
 */

import {
  menuItems,
  galleryImages,
  testimonials,
  blogPosts,
  type MenuItem,
  type GalleryImage,
  type Testimonial,
  type BlogPost,
} from "@/lib/data";

// ─── Booking types ────────────────────────────────────────────────────────────
export type BookingStatus =
  "PENDING" | "REVIEWING" | "QUOTED" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

export interface Booking {
  id: string;
  refNumber: string;
  fullName: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  preferredTime: string;
  guestCount: number;
  location: string;
  budgetRange?: string;
  cuisinePrefs?: string;
  dietaryReqs?: string;
  specialRequests?: string;
  status: BookingStatus;
  createdAt: string;
  notes?: string;
  quotedAmount?: number;
}

// ─── Seed bookings ─────────────────────────────────────────────────────────────
export const seedBookings: Booking[] = [
  {
    id: "b1",
    refNumber: "CHEF-1024",
    fullName: "Sarah Mwangi",
    email: "sarah@example.com",
    phone: "+254 700 111 222",
    eventType: "Private Dining",
    eventDate: "2026-08-30",
    preferredTime: "19:00",
    guestCount: 8,
    location: "Karen, Nairobi",
    budgetRange: "KES 50,000 – 100,000",
    cuisinePrefs: "Contemporary African",
    dietaryReqs: "One vegetarian",
    status: "PENDING",
    createdAt: "2026-08-18T10:23:00Z",
  },
  {
    id: "b2",
    refNumber: "CHEF-1025",
    fullName: "James Kariuki",
    email: "james@corp.ke",
    phone: "+254 711 333 444",
    eventType: "Corporate Event",
    eventDate: "2026-09-05",
    preferredTime: "12:30",
    guestCount: 40,
    location: "Westlands, Nairobi",
    budgetRange: "KES 100,000 – 250,000",
    cuisinePrefs: "International",
    status: "REVIEWING",
    createdAt: "2026-08-17T14:05:00Z",
    notes: "Board lunch, needs full service staff",
  },
  {
    id: "b3",
    refNumber: "CHEF-1026",
    fullName: "Amina & David Otieno",
    email: "amina@gmail.com",
    phone: "+254 722 555 666",
    eventType: "Wedding Catering",
    eventDate: "2026-10-12",
    preferredTime: "16:00",
    guestCount: 180,
    location: "Muthaiga Country Club",
    budgetRange: "Above KES 250,000",
    cuisinePrefs: "Mixed",
    dietaryReqs: "Halal + vegetarian tables",
    status: "CONFIRMED",
    createdAt: "2026-08-10T09:00:00Z",
    quotedAmount: 380000,
  },
  {
    id: "b4",
    refNumber: "CHEF-1027",
    fullName: "Grace Wanjiru",
    email: "grace@example.com",
    phone: "+254 733 777 888",
    eventType: "Cooking Class",
    eventDate: "2026-08-28",
    preferredTime: "10:00",
    guestCount: 4,
    location: "Kilimani, Nairobi",
    budgetRange: "KES 20,000 – 50,000",
    status: "QUOTED",
    createdAt: "2026-08-15T11:30:00Z",
    quotedAmount: 32000,
  },
  {
    id: "b5",
    refNumber: "CHEF-1028",
    fullName: "Robert Odhiambo",
    email: "rob@biz.co.ke",
    phone: "+254 744 999 000",
    eventType: "Birthday / Private Party",
    eventDate: "2026-08-22",
    preferredTime: "18:00",
    guestCount: 30,
    location: "Lavington, Nairobi",
    status: "COMPLETED",
    createdAt: "2026-08-01T08:45:00Z",
    quotedAmount: 85000,
  },
  {
    id: "b6",
    refNumber: "CHEF-1029",
    fullName: "Linda Njoroge",
    email: "linda@example.com",
    phone: "+254 755 123 456",
    eventType: "Weekly Meal Preparation",
    eventDate: "2026-08-25",
    preferredTime: "09:00",
    guestCount: 2,
    location: "Spring Valley, Nairobi",
    budgetRange: "KES 20,000 – 50,000",
    status: "CANCELLED",
    createdAt: "2026-08-12T16:20:00Z",
  },
];

// ─── Simple client-side store (would be replaced by API calls in production) ──
class AdminStore {
  bookings: Booking[] = [...seedBookings];
  menu: MenuItem[] = [...menuItems];
  gallery: GalleryImage[] = [...galleryImages];
  testimonialsData: Testimonial[] = [...testimonials];
  posts: BlogPost[] = [...blogPosts];

  // Bookings
  updateBookingStatus(id: string, status: BookingStatus) {
    this.bookings = this.bookings.map((b) =>
      b.id === id ? { ...b, status } : b,
    );
  }
  updateBookingNotes(id: string, notes: string) {
    this.bookings = this.bookings.map((b) =>
      b.id === id ? { ...b, notes } : b,
    );
  }
  updateBookingQuote(id: string, amount: number) {
    this.bookings = this.bookings.map((b) =>
      b.id === id ? { ...b, quotedAmount: amount, status: "QUOTED" } : b,
    );
  }

  // Menu
  addMenuItem(item: MenuItem) {
    this.menu = [...this.menu, item];
  }
  updateMenuItem(item: MenuItem) {
    this.menu = this.menu.map((m) => (m.id === item.id ? item : m));
  }
  deleteMenuItem(id: string) {
    this.menu = this.menu.filter((m) => m.id !== id);
  }
  toggleAvailability(id: string) {
    this.menu = this.menu.map((m) =>
      m.id === id ? { ...m, available: !m.available } : m,
    );
  }

  // Gallery
  addGalleryImage(img: GalleryImage) {
    this.gallery = [...this.gallery, img];
  }
  deleteGalleryImage(id: string) {
    this.gallery = this.gallery.filter((g) => g.id !== id);
  }

  // Testimonials
  deleteTestimonial(id: string) {
    this.testimonialsData = this.testimonialsData.filter((t) => t.id !== id);
  }
  toggleFeatured(id: string) {
    this.testimonialsData = this.testimonialsData.map((t) =>
      t.id === id ? { ...t, featured: !t.featured } : t,
    );
  }

  // Blog
  deletePost(id: string) {
    this.posts = this.posts.filter((p) => p.id !== id);
  }
  togglePublished(id: string) {
    this.posts = this.posts.map((p) =>
      p.id === id
        ? { ...p, category: p.category === "Draft" ? "Chef Tips" : p.category }
        : p,
    );
  }
}

// Singleton, in production this is replaced by SWR/React Query + API routes
export const adminStore = new AdminStore();
