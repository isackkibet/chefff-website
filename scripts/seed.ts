/**
 * Seeds the DB with the static data from lib/data.ts
 * Safe to run multiple times, skips existing records.
 *   npx tsx scripts/seed.ts
 */
import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error("DATABASE_URL is not set in .env.local");

const sql = neon(DATABASE_URL);

async function seed() {
  console.log("Seeding database…");

  // ── Menu items ──────────────────────────────────────────────────────────────
  const menuRows = [
    {
      name: "Seared Scallops",
      category: "Starters",
      price: 1800,
      chef_pick: true,
      available: true,
      description:
        "Pan-seared scallops on cauliflower purée, crispy pancetta and micro herbs.",
      image:
        "https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=600&q=80",
      ingredients:
        '["Scallops","Cauliflower","Pancetta","Butter","Lemon","Micro herbs"]',
      allergens: '["Shellfish","Dairy"]',
      dietary: "[]",
    },
    {
      name: "Roasted Beetroot Salad",
      category: "Starters",
      price: 1200,
      chef_pick: false,
      available: true,
      description:
        "Honey-roasted beetroot, whipped goat's cheese, candied walnuts and balsamic glaze.",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
      ingredients: '["Beetroot","Goats cheese","Walnuts","Honey","Balsamic"]',
      allergens: '["Dairy","Tree Nuts"]',
      dietary: '["Vegetarian","Gluten Free","Contains Nuts"]',
    },
    {
      name: "Butternut Soup",
      category: "Starters",
      price: 950,
      chef_pick: false,
      available: true,
      description:
        "Velvety butternut squash soup with coconut cream, chilli oil and toasted pepitas.",
      image:
        "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
      ingredients: '["Butternut squash","Coconut cream","Chilli","Pepitas"]',
      allergens: "[]",
      dietary: '["Vegan","Gluten Free","Dairy Free"]',
    },
    {
      name: "Signature Grilled Beef Tenderloin",
      category: "Mains",
      price: 4500,
      chef_pick: true,
      available: true,
      description:
        "Premium 250g beef tenderloin, herb butter, roasted seasonal vegetables and truffle potato gratin.",
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80",
      ingredients:
        '["Beef tenderloin","Herb butter","Seasonal vegetables","Potato","Truffle oil"]',
      allergens: '["Dairy"]',
      dietary: '["Gluten Free"]',
    },
    {
      name: "Pan-Seared Salmon",
      category: "Mains",
      price: 3800,
      chef_pick: false,
      available: true,
      description:
        "Atlantic salmon fillet, lemon caper beurre blanc, wilted spinach and saffron risotto.",
      image:
        "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80",
      ingredients:
        '["Salmon","Capers","Lemon","Arborio rice","Saffron","Spinach"]',
      allergens: '["Fish","Dairy"]',
      dietary: '["Gluten Free"]',
    },
    {
      name: "Lamb Rack",
      category: "Mains",
      price: 5200,
      chef_pick: true,
      available: true,
      description:
        "Herb-crusted rack of lamb, rosemary jus, fondant potato and roasted asparagus.",
      image:
        "https://images.unsplash.com/photo-1624300629298-e9de39c13be5?w=600&q=80",
      ingredients: '["Lamb rack","Herbs","Rosemary","Potato","Asparagus"]',
      allergens: '["Dairy","Gluten"]',
      dietary: "[]",
    },
    {
      name: "Wild Mushroom Risotto",
      category: "Mains",
      price: 2800,
      chef_pick: false,
      available: true,
      description:
        "Creamy Arborio risotto with wild mushroom medley, aged parmesan and truffle oil.",
      image:
        "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80",
      ingredients:
        '["Arborio rice","Wild mushrooms","Parmesan","Truffle oil","White wine"]',
      allergens: '["Dairy","Sulphites"]',
      dietary: '["Vegetarian","Gluten Free"]',
    },
    {
      name: "Chocolate Fondant",
      category: "Desserts",
      price: 1400,
      chef_pick: true,
      available: true,
      description:
        "Warm dark chocolate fondant, molten centre, vanilla bean ice cream and salted caramel.",
      image:
        "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=600&q=80",
      ingredients:
        '["Dark chocolate","Butter","Eggs","Vanilla ice cream","Caramel"]',
      allergens: '["Dairy","Eggs","Gluten"]',
      dietary: "[]",
    },
    {
      name: "Mango Panna Cotta",
      category: "Desserts",
      price: 1100,
      chef_pick: false,
      available: true,
      description:
        "Light coconut panna cotta, fresh mango coulis and toasted coconut flakes.",
      image:
        "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80",
      ingredients: '["Coconut cream","Gelatin","Mango","Coconut flakes"]',
      allergens: "[]",
      dietary: '["Dairy Free","Gluten Free"]',
    },
    {
      name: "Hibiscus Iced Tea",
      category: "Drinks",
      price: 450,
      chef_pick: false,
      available: true,
      description:
        "House-made hibiscus infusion, mint, lime and a hint of ginger. Served over ice.",
      image:
        "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80",
      ingredients: '["Hibiscus flowers","Mint","Lime","Ginger","Cane sugar"]',
      allergens: "[]",
      dietary: '["Vegan","Gluten Free","Dairy Free"]',
    },
    {
      name: "Spiced Lamb Samosas",
      category: "Chef Specials",
      price: 1600,
      chef_pick: true,
      available: true,
      description:
        "Crispy pastry filled with spiced minced lamb, peas and fresh coriander. Served with tamarind chutney.",
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80",
      ingredients: '["Lamb mince","Peas","Coriander","Pastry","Tamarind"]',
      allergens: '["Gluten"]',
      dietary: '["Spicy"]',
    },
    {
      name: "Nyama Choma Platter",
      category: "Chef Specials",
      price: 3600,
      chef_pick: true,
      available: true,
      description:
        "Chef Harrizona's take on a Kenyan classic: slow-charred goat, kachumbari, ugali crisps and house pepper sauce.",
      image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
      ingredients:
        '["Goat","Tomatoes","Onions","Coriander","Ugali","Chillies"]',
      allergens: "[]",
      dietary: '["Gluten Free","Dairy Free"]',
    },
  ];

  for (const row of menuRows) {
    await sql`
      INSERT INTO menu_items (name, category, description, price, image, ingredients, allergens, dietary, available, chef_pick)
      VALUES (${row.name}, ${row.category}, ${row.description}, ${row.price}, ${row.image},
              ${row.ingredients}, ${row.allergens}, ${row.dietary}, ${row.available}, ${row.chef_pick})
      ON CONFLICT DO NOTHING
    `;
  }
  console.log(`✓ Seeded ${menuRows.length} menu items`);

  // ── Testimonials ────────────────────────────────────────────────────────────
  const testimonialRows = [
    {
      name: "Sarah M.",
      role: "Private Dinner Guest",
      rating: 5,
      service: "Private Dining",
      date: "June 2026",
      featured: true,
      text: "Chef Harrizona transformed our anniversary into something truly magical. Every course was a masterpiece and the attention to our preferences was exceptional.",
    },
    {
      name: "James K.",
      role: "Corporate Client",
      rating: 5,
      service: "Corporate Catering",
      date: "May 2026",
      featured: true,
      text: "We hired Chef Harrizona for our annual board dinner. The food and service were outstanding, and our guests are still talking about it months later.",
    },
    {
      name: "Amina & David",
      role: "Newly-weds",
      rating: 5,
      service: "Wedding Catering",
      date: "April 2026",
      featured: true,
      text: "Our wedding menu was absolutely perfect. The tasting session was fun and professional, and on the day everything was flawless. Highly recommend.",
    },
    {
      name: "Grace W.",
      role: "Cooking Class Student",
      rating: 5,
      service: "Cooking Class",
      date: "March 2026",
      featured: false,
      text: "I signed up for the private cooking class as a birthday gift to myself. Best decision ever. Chef Harrizona is incredibly patient and knowledgeable.",
    },
    {
      name: "Robert O.",
      role: "Birthday Party Host",
      rating: 5,
      service: "Private Events",
      date: "February 2026",
      featured: false,
      text: "We had 30 guests for my wife's 40th and not a single complaint, only compliments. The nyama choma platter was a show-stopper.",
    },
    {
      name: "Linda N.",
      role: "Meal Prep Client",
      rating: 5,
      service: "Meal Preparation",
      date: "January 2026",
      featured: false,
      text: "The weekly meal prep service has completely changed how I eat. Healthy, delicious and perfectly portioned. Worth every shilling.",
    },
  ];

  for (const row of testimonialRows) {
    await sql`
      INSERT INTO testimonials (name, role, rating, text, service, date, featured)
      VALUES (${row.name}, ${row.role}, ${row.rating}, ${row.text}, ${row.service}, ${row.date}, ${row.featured})
      ON CONFLICT DO NOTHING
    `;
  }
  console.log(`✓ Seeded ${testimonialRows.length} testimonials`);

  // ── Blog posts ──────────────────────────────────────────────────────────────
  const blogRows = [
    {
      slug: "5-secrets-to-perfect-grilled-beef",
      title: "5 Secrets to Perfect Grilled Beef",
      excerpt:
        "After years of cooking beef for private clients, these five fundamentals make the difference between good and unforgettable.",
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
      category: "Chef Tips",
      published_at: "2026-08-10",
      read_time: 5,
      featured: true,
    },
    {
      slug: "how-to-plan-a-private-dinner-party",
      title: "How to Plan a Private Dinner Party",
      excerpt:
        "Everything you need to know to host a flawless private dinner, from invitations to the perfect closing course.",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
      category: "Events",
      published_at: "2026-07-22",
      read_time: 7,
      featured: true,
    },
    {
      slug: "kenyan-ingredients-every-chef-should-know",
      title: "Kenyan Ingredients Every Chef Should Know",
      excerpt:
        "From managu to kunde, arrow roots to fresh tilapia, these are the building blocks of a modern Kenyan kitchen.",
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80",
      category: "Culinary Stories",
      published_at: "2026-07-05",
      read_time: 6,
      featured: false,
    },
    {
      slug: "the-art-of-the-tasting-menu",
      title: "The Art of the Tasting Menu",
      excerpt:
        "Why a well-designed tasting menu is the purest expression of a chef's vision, and how to build one.",
      image:
        "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80",
      category: "Recipes",
      published_at: "2026-06-18",
      read_time: 8,
      featured: false,
    },
  ];

  for (const row of blogRows) {
    await sql`
      INSERT INTO blog_posts (slug, title, excerpt, image, category, published_at, read_time, featured)
      VALUES (${row.slug}, ${row.title}, ${row.excerpt}, ${row.image}, ${row.category},
              ${row.published_at}, ${row.read_time}, ${row.featured})
      ON CONFLICT (slug) DO NOTHING
    `;
  }
  console.log(`✓ Seeded ${blogRows.length} blog posts`);

  console.log("\n✅ Seed complete.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
