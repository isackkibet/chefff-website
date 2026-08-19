// ─── Brand / Contact ─────────────────────────────────────────────────────────
export const brand = {
  name: 'Chef Harrizona',
  tagline: 'Private Dining • Catering • Culinary Experiences',
  headline: 'Exceptional food. Unforgettable experiences.',
  description:
    'Chef Harrizona brings restaurant-quality private dining, bespoke event catering and immersive culinary experiences directly to you — in Nairobi and beyond.',
  phone: '0768737930',
  whatsapp: '254768737930',
  email: 'harrisonbzn@gmail.com',
  location: 'Nairobi, Kenya',
  serviceArea: 'Nairobi & surrounding areas',
  businessHours: 'Mon – Sat: 8 AM – 8 PM',
  instagram: 'https://instagram.com/chefharrizona',
  tiktok: 'https://tiktok.com/@chefharrizona',
  facebook: 'https://facebook.com/chefharrizona',
  youtube: 'https://youtube.com/@chefharrizona',
  whatsappMsg: 'Hello Chef Harrizona, I would like to enquire about a private dining experience.',
}

// ─── Stats ───────────────────────────────────────────────────────────────────
export const stats = [
  { value: '4', label: 'Years Experience' },
  { value: '500+', label: 'Events Hosted' },
  { value: '20+', label: 'Signature Dishes' },
  { value: '4.9/5', label: 'Guest Rating' },
]

// ─── Services ────────────────────────────────────────────────────────────────
export const services = [
  {
    slug: 'private-chef',
    icon: '👨‍🍳',
    title: 'Private Chef',
    short: 'A personalised restaurant experience in your home or chosen location.',
    description:
      'Chef Harrizona comes to you — your kitchen, your venue, your rules. From intimate dinners for two to gatherings of twenty, every meal is crafted fresh and served with full front-of-house attention.',
    features: ['Menu consultation', 'Grocery sourcing', 'Full preparation & service', 'Kitchen clean-up'],
    image: '/private-chef.jpeg',
  },
  {
    slug: 'wedding-catering',
    icon: '💍',
    title: 'Wedding Catering',
    short: 'Bespoke menus designed around your wedding day.',
    description:
      'From intimate garden weddings to grand celebrations, Chef Harrizona designs menus that reflect your story. Every course is crafted to complement your venue, season and style.',
    features: ['Tasting sessions', 'Custom menu design', 'Full day service', 'Dietary accommodations'],
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
  },
  {
    slug: 'corporate-catering',
    icon: '🏢',
    title: 'Corporate Catering',
    short: 'Premium food experiences for meetings and business events.',
    description:
      'Impress clients and energise your team. Chef Harrizona provides professional catering for conferences, board meetings, product launches and corporate retreats.',
    features: ['Breakfast & lunch sets', 'Working lunch boxes', 'Canapes & cocktail receptions', 'Full corporate dinners'],
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80',
  },
  {
    slug: 'private-events',
    icon: '🎉',
    title: 'Private Events',
    short: 'Customised menus and full service for birthdays, anniversaries and celebrations.',
    description:
      'Make every celebration memorable. Whether it is a milestone birthday, anniversary dinner or a themed garden party, Chef Harrizona brings the food and the atmosphere.',
    features: ['Theme-based menus', 'Custom cakes coordination', 'Canape service', 'Staffed bar options'],
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
  },
  {
    slug: 'meal-preparation',
    icon: '🥗',
    title: 'Weekly Meal Prep',
    short: 'Healthy, restaurant-quality meals prepared weekly for busy lifestyles.',
    description:
      'Let Chef Harrizona stock your fridge every week with nutritious, delicious meals tailored to your dietary goals and taste preferences.',
    features: ['Weekly or bi-weekly service', 'Portioned & labelled', 'Nutritionist-friendly options', 'Dietary customisation'],
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
  },
  {
    slug: 'cooking-classes',
    icon: '🎓',
    title: 'Cooking Classes',
    short: 'Private and group culinary classes for all skill levels.',
    description:
      'Learn the techniques behind Chef Harrizona\'s signature dishes. Classes run from beginner knife skills to advanced sauce work and pastry fundamentals.',
    features: ['Private 1-on-1 sessions', 'Group classes up to 10', 'Corporate team-building', 'Kids cooking sessions'],
    image: 'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=800&q=80',
  },
  {
    slug: 'pastry-services',
    icon: '🥐',
    title: 'Pastry Services',
    short: 'Handcrafted samosas, spring rolls, pizza and more — made fresh to order.',
    description:
      'Chef Harrizona\'s pastry service brings beautifully handcrafted bites to your event or home. From golden samosas and crispy spring rolls to artisan pizza — each item is made fresh with quality ingredients.',
    features: [
      'Samosa — KES 15 per piece',
      'Spring rolls — KES 20 per piece',
      'Pizza — KES 800 (whole) / KES 250 per slice',
      'Minimum order quantities apply',
      'Bulk & event orders welcome',
      'Custom fillings available',
    ],
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80',
    price: 4500,
    originalPrice: 5000,
    priceLabel: 'Starting package',
    pricingItems: [
      { item: 'Samosa', price: 15, unit: 'per piece' },
      { item: 'Spring Rolls', price: 20, unit: 'per piece' },
      { item: 'Pizza (whole)', price: 800, unit: 'per pizza' },
      { item: 'Pizza (slice)', price: 250, unit: 'per slice' },
    ],
  },
  {
    slug: 'cooking-services',
    icon: '🍳',
    title: 'Cooking Services',
    short: 'Full breakfast, lunch buffets and dinner — professionally prepared at your location.',
    description:
      'Let Chef Harrizona handle the cooking so you can focus on your guests. From a hearty full breakfast spread to an elegant dinner service, every meal is prepared fresh on-site with care and expertise.',
    features: [
      'Full breakfast — KES 1,500 per person',
      'Lunch buffet — KES 2,000 per person',
      'Full dinner service — available on request',
      'On-site preparation & service',
      'All dietary requirements accommodated',
      'Equipment provided',
    ],
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    price: 3000,
    originalPrice: 5000,
    priceLabel: 'Per person from',
    pricingItems: [
      { item: 'Full Breakfast', price: 1500, unit: 'per person' },
      { item: 'Lunch Buffet', price: 2000, unit: 'per person' },
      { item: 'Full Dinner', price: 0, unit: 'get a quote' },
    ],
  },
]

// ─── Menu categories ──────────────────────────────────────────────────────────
export type DietaryTag = 'Vegetarian' | 'Vegan' | 'Gluten Free' | 'Dairy Free' | 'Contains Nuts' | 'Spicy'

export interface MenuItem {
  id: string
  name: string
  category: 'Starters' | 'Mains' | 'Desserts' | 'Drinks' | 'Chef Specials'
  description: string
  price: number
  image: string
  ingredients: string[]
  allergens: string[]
  dietary: DietaryTag[]
  available: boolean
  chefPick?: boolean
}

export const menuItems: MenuItem[] = [
  // ── Chef Specials — Authentic Kenyan (NEW · shown first) ─────────────────
  {
    id: 'm-cs1',
    name: 'Nyama Choma Platter',
    category: 'Chef Specials',
    description: "Chef Harrizona's slow-charred goat, kachumbari, ugali crisps and house pepper sauce.",
    price: 3200,
    image: '/nyama-choma.jpeg',
    ingredients: ['2kg premium goat meat', 'Traditional spice blend', 'Ugali flour', 'Fresh kachumbari vegetables', 'House pepper sauce'],
    allergens: [],
    dietary: ['Gluten Free', 'Dairy Free'],
    available: true,
    chefPick: true,
  },
  {
    id: 'm-cs2',
    name: 'Samaki wa Nazi',
    category: 'Chef Specials',
    description: 'Fresh tilapia in rich coconut curry with aromatic coastal spices, served with basmati rice.',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80',
    ingredients: ['Fresh tilapia/kingfish', 'Fresh coconut milk', 'Coastal spice mix', 'Curry leaves', 'Coriander', 'Basmati rice'],
    allergens: ['Fish'],
    dietary: ['Gluten Free', 'Dairy Free'],
    available: true,
    chefPick: true,
  },
  {
    id: 'm-cs3',
    name: 'Pilau Masala',
    category: 'Chef Specials',
    description: "Fragrant Kenyan pilau with Harrizona's secret masala blend, premium basmati and tender beef.",
    price: 3500,
    image: '/pilau-masala.jpeg',
    ingredients: ['Premium basmati rice', 'Pilau masala', 'Beef/chicken', 'Caramelized onions', 'Garlic & ginger'],
    allergens: [],
    dietary: [],
    available: true,
    chefPick: true,
  },
  {
    id: 'm-cs4',
    name: 'Vegetarian Githeri',
    category: 'Chef Specials',
    description: 'Hearty mixed beans and maize, perfectly seasoned with traditional spices and fresh vegetables.',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80',
    ingredients: ['Premium mixed beans', 'White maize kernels', 'Fresh vegetables', 'Traditional seasoning', 'Coconut oil'],
    allergens: [],
    dietary: ['Vegan', 'Gluten Free', 'Dairy Free'],
    available: true,
  },
  {
    id: 'm-cs5',
    name: 'Sukuma Wiki Deluxe',
    category: 'Chef Specials',
    description: 'Farm-fresh sukuma wiki elevated with special seasoning, served with premium ugali.',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80',
    ingredients: ['Fresh sukuma wiki', 'Premium maize flour', 'Special seasoning', 'Fresh tomatoes & onions', 'Cooking oil'],
    allergens: [],
    dietary: ['Vegan', 'Gluten Free', 'Dairy Free'],
    available: true,
  },
  {
    id: 'm-cs6',
    name: 'Mukimo Traditional',
    category: 'Chef Specials',
    description: 'Authentic Kikuyu mukimo — mashed potato with pumpkin leaves, green maize and traditional beans.',
    price: 2400,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80',
    ingredients: ['Irish potatoes', 'Fresh pumpkin leaves', 'Green maize', 'Traditional beans', 'Seasoning blend'],
    allergens: [],
    dietary: ['Vegetarian', 'Gluten Free'],
    available: true,
  },
  {
    id: 'm-cs7',
    name: 'Chapati & Beef Stew',
    category: 'Chef Specials',
    description: 'Fluffy layered chapatis with slow-cooked rich beef stew — the ultimate Kenyan comfort meal.',
    price: 3800,
    image: '/chapati.jpeg',
    ingredients: ['Premium wheat flour', 'Tender beef cuts', 'Stew spice blend', 'Fresh vegetables'],
    allergens: ['Gluten'],
    dietary: [],
    available: true,
    chefPick: true,
  },
  {
    id: 'm-cs8',
    name: 'Kenyan Breakfast Platter',
    category: 'Chef Specials',
    description: 'Golden mandazi, premium chai, fresh accompaniments — the classic Kenyan morning experience.',
    price: 1600,
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80',
    ingredients: ['Mandazi', 'Premium tea leaves', 'Fresh milk', 'Coconut', 'Breakfast spice blend'],
    allergens: ['Gluten', 'Dairy'],
    dietary: ['Vegetarian'],
    available: true,
  },
  // ── Starters ─────────────────────────────────────────────────────────────
  {
    id: 'm1',
    name: 'Seared Scallops',
    category: 'Starters',
    description: 'Pan-seared scallops on cauliflower purée, crispy pancetta and micro herbs.',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=600&q=80',
    ingredients: ['Scallops', 'Cauliflower', 'Pancetta', 'Butter', 'Lemon', 'Micro herbs'],
    allergens: ['Shellfish', 'Dairy'],
    dietary: [],
    available: true,
    chefPick: true,
  },
  {
    id: 'm2',
    name: 'Roasted Beetroot Salad',
    category: 'Starters',
    description: "Honey-roasted beetroot, whipped goat's cheese, candied walnuts and balsamic glaze.",
    price: 1200,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80',
    ingredients: ["Beetroot", "Goat's cheese", 'Walnuts', 'Honey', 'Balsamic'],
    allergens: ['Dairy', 'Tree Nuts'],
    dietary: ['Vegetarian', 'Gluten Free', 'Contains Nuts'],
    available: true,
  },
  {
    id: 'm3',
    name: 'Butternut Soup',
    category: 'Starters',
    description: 'Velvety butternut squash soup with coconut cream, chilli oil and toasted pepitas.',
    price: 950,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80',
    ingredients: ['Butternut squash', 'Coconut cream', 'Chilli', 'Pepitas'],
    allergens: [],
    dietary: ['Vegan', 'Gluten Free', 'Dairy Free'],
    available: true,
  },
  // ── Mains ─────────────────────────────────────────────────────────────────
  {
    id: 'm4',
    name: 'Signature Grilled Beef Tenderloin',
    category: 'Mains',
    description: 'Premium 250g beef tenderloin, herb butter, roasted seasonal vegetables and truffle potato gratin.',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80',
    ingredients: ['Beef tenderloin', 'Herb butter', 'Seasonal vegetables', 'Potato', 'Truffle oil'],
    allergens: ['Dairy'],
    dietary: ['Gluten Free'],
    available: true,
    chefPick: true,
  },
  {
    id: 'm5',
    name: 'Pan-Seared Salmon',
    category: 'Mains',
    description: 'Atlantic salmon fillet, lemon caper beurre blanc, wilted spinach and saffron risotto.',
    price: 3800,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80',
    ingredients: ['Salmon', 'Capers', 'Lemon', 'Arborio rice', 'Saffron', 'Spinach'],
    allergens: ['Fish', 'Dairy'],
    dietary: ['Gluten Free'],
    available: true,
  },
  {
    id: 'm6',
    name: 'Lamb Rack',
    category: 'Mains',
    description: 'Herb-crusted rack of lamb, rosemary jus, fondant potato and roasted asparagus.',
    price: 5200,
    image: 'https://images.unsplash.com/photo-1624300629298-e9de39c13be5?w=600&q=80',
    ingredients: ['Lamb rack', 'Herbs', 'Rosemary', 'Potato', 'Asparagus'],
    allergens: ['Dairy', 'Gluten'],
    dietary: [],
    available: true,
    chefPick: true,
  },
  {
    id: 'm7',
    name: 'Wild Mushroom Risotto',
    category: 'Mains',
    description: 'Creamy Arborio risotto with wild mushroom medley, aged parmesan and truffle oil.',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80',
    ingredients: ['Arborio rice', 'Wild mushrooms', 'Parmesan', 'Truffle oil', 'White wine'],
    allergens: ['Dairy', 'Sulphites'],
    dietary: ['Vegetarian', 'Gluten Free'],
    available: true,
  },
  // ── Desserts ──────────────────────────────────────────────────────────────
  {
    id: 'm8',
    name: 'Chocolate Fondant',
    category: 'Desserts',
    description: 'Warm dark chocolate fondant, molten centre, vanilla bean ice cream and salted caramel.',
    price: 1400,
    image: 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=600&q=80',
    ingredients: ['Dark chocolate', 'Butter', 'Eggs', 'Vanilla ice cream', 'Caramel'],
    allergens: ['Dairy', 'Eggs', 'Gluten'],
    dietary: [],
    available: true,
    chefPick: true,
  },
  {
    id: 'm9',
    name: 'Mango Panna Cotta',
    category: 'Desserts',
    description: 'Light coconut panna cotta, fresh mango coulis and toasted coconut flakes.',
    price: 1100,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80',
    ingredients: ['Coconut cream', 'Gelatin', 'Mango', 'Coconut flakes'],
    allergens: [],
    dietary: ['Dairy Free', 'Gluten Free'],
    available: true,
  },
  // ── Drinks ────────────────────────────────────────────────────────────────
  {
    id: 'm10',
    name: 'Hibiscus Iced Tea',
    category: 'Drinks',
    description: 'House-made hibiscus infusion, mint, lime and a hint of ginger. Served over ice.',
    price: 450,
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80',
    ingredients: ['Hibiscus flowers', 'Mint', 'Lime', 'Ginger', 'Cane sugar'],
    allergens: [],
    dietary: ['Vegan', 'Gluten Free', 'Dairy Free'],
    available: true,
  },
]

// ─── Gallery ─────────────────────────────────────────────────────────────────
export type GalleryCategory = 'All' | 'Food' | 'Events' | 'Private Dining' | 'Weddings' | 'Behind the Scenes' | 'Chef'

export interface GalleryImage {
  id: string
  src: string
  alt: string
  caption?: string
  category: Exclude<GalleryCategory, 'All'>
}

export const galleryImages: GalleryImage[] = [
  { id: 'g1',  src: '/nyama-choma.jpeg',        alt: 'Traditional nyama choma platter',     caption: 'Nyama Choma Platter',   category: 'Food' },
  { id: 'g2',  src: '/pilau-masala.jpeg',       alt: 'Fragrant pilau masala with spices',   caption: 'Pilau Masala',         category: 'Food' },
  { id: 'g3',  src: '/chapati.jpeg',            alt: 'Chapati and beef stew',               caption: 'Chapati & Beef Stew',  category: 'Food' },
  { id: 'g4',  src: '/private-chef.jpeg',       alt: 'Chef Harrizona ready for a private event', caption: 'Private Chef',   category: 'Private Dining' },
  { id: 'g5',  src: '/chef-about.jpeg',         alt: 'Chef Harrizona in the kitchen',       caption: 'Chef Harrizona',      category: 'Chef' },
  { id: 'g6',  src: '/chef-about-2.jpeg',       alt: 'Chef Harrizona in chef whites',       caption: 'Chef Harrizona',      category: 'Chef' },
  { id: 'g7',  src: '/gallery-food-1.jpeg',     alt: 'Signature dish from Chef Harrizona',  caption: 'Signature Dish',      category: 'Food' },
  { id: 'g8',  src: '/gallery-food-2.jpeg',     alt: 'Signature dish from Chef Harrizona',  caption: 'Signature Dish',      category: 'Food' },
  { id: 'g9',  src: '/gallery-food-3.jpeg',     alt: 'Signature dish from Chef Harrizona',  caption: 'Signature Dish',      category: 'Food' },
  { id: 'g10', src: '/gallery-food-4.jpeg',     alt: 'Signature dish from Chef Harrizona',  caption: 'Signature Dish',      category: 'Food' },
  { id: 'g11', src: '/gallery-food-5.jpeg',     alt: 'Signature dish from Chef Harrizona',  caption: 'Signature Dish',      category: 'Food' },
  { id: 'g12', src: '/gallery-food-6.jpeg',     alt: 'Signature dish from Chef Harrizona',  caption: 'Signature Dish',      category: 'Food' },
]

// ─── Testimonials ─────────────────────────────────────────────────────────────
export interface Testimonial {
  id: string
  name: string
  role: string
  rating: number
  text: string
  service: string
  date: string
  featured?: boolean
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah M.',
    role: 'Private Dinner Guest',
    rating: 5,
    text: 'Chef Harrizona transformed our anniversary into something truly magical. Every course was a masterpiece and the attention to our preferences was exceptional.',
    service: 'Private Dining',
    date: 'June 2026',
    featured: true,
  },
  {
    id: 't2',
    name: 'James K.',
    role: 'Corporate Client',
    rating: 5,
    text: 'We hired Chef Harrizona for our annual board dinner. The food and service were outstanding — our guests are still talking about it months later.',
    service: 'Corporate Catering',
    date: 'May 2026',
    featured: true,
  },
  {
    id: 't3',
    name: 'Amina & David',
    role: 'Newly-weds',
    rating: 5,
    text: 'Our wedding menu was absolutely perfect. The tasting session was fun and professional, and on the day everything was flawless. Highly recommend.',
    service: 'Wedding Catering',
    date: 'April 2026',
    featured: true,
  },
  {
    id: 't4',
    name: 'Grace W.',
    role: 'Cooking Class Student',
    rating: 5,
    text: 'I signed up for the private cooking class as a birthday gift to myself. Best decision ever. Chef Harrizona is incredibly patient and knowledgeable.',
    service: 'Cooking Class',
    date: 'March 2026',
  },
  {
    id: 't5',
    name: 'Robert O.',
    role: 'Birthday Party Host',
    rating: 5,
    text: 'We had 30 guests for my wife\'s 40th and not a single complaint — only compliments. The nyama choma platter was a show-stopper.',
    service: 'Private Events',
    date: 'February 2026',
  },
  {
    id: 't6',
    name: 'Linda N.',
    role: 'Meal Prep Client',
    rating: 5,
    text: 'The weekly meal prep service has completely changed how I eat. Healthy, delicious and perfectly portioned. Worth every shilling.',
    service: 'Meal Preparation',
    date: 'January 2026',
  },
]

// ─── Events ──────────────────────────────────────────────────────────────────
export interface ChefEvent {
  id: string
  title: string
  date: string
  location: string
  description: string
  type: 'upcoming' | 'past'
  category: string
  image: string
  spots?: number
  spotsLeft?: number
}

export const events: ChefEvent[] = [
  {
    id: 'e1',
    title: 'Farm-to-Table Dinner Experience',
    date: '2026-08-25',
    location: 'Karen, Nairobi',
    description: 'An intimate 12-seat dining experience built around a seasonal menu sourced entirely from local Kenyan farms.',
    type: 'upcoming',
    category: 'Private Dining',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    spots: 12,
    spotsLeft: 4,
  },
  {
    id: 'e2',
    title: 'Kenyan Heritage Cooking Class',
    date: '2026-09-06',
    location: 'Westlands, Nairobi',
    description: 'A deep dive into classic Kenyan flavours — nyama choma, sukuma wiki elevated, and modern takes on traditional desserts.',
    type: 'upcoming',
    category: 'Cooking Class',
    image: 'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=800&q=80',
    spots: 8,
    spotsLeft: 3,
  },
  {
    id: 'e3',
    title: 'Sunset Rooftop Dinner',
    date: '2026-09-20',
    location: 'Upperhill, Nairobi',
    description: 'A five-course tasting menu with paired mocktails and views over Nairobi at sunset.',
    type: 'upcoming',
    category: 'Pop-up Dinner',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
    spots: 20,
    spotsLeft: 11,
  },
  {
    id: 'e4',
    title: 'Gatanga Estate Wedding',
    date: '2026-07-12',
    location: 'Gatanga, Murang\'a',
    description: 'Full-day wedding catering for 200 guests with a custom six-course menu.',
    type: 'past',
    category: 'Wedding Catering',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
  },
  {
    id: 'e5',
    title: 'Tech Summit Corporate Dinner',
    date: '2026-06-28',
    location: 'KICC, Nairobi',
    description: 'Gala dinner for 80 executives at an annual technology conference.',
    type: 'past',
    category: 'Corporate Catering',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80',
  },
]

// ─── Blog posts ───────────────────────────────────────────────────────────────
export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content?: string
  image: string
  category: string
  author: string
  date: string
  readTime: number
  featured?: boolean
}

export const blogPosts: BlogPost[] = [
  {
    id: 'b1',
    slug: '5-secrets-to-perfect-grilled-beef',
    title: '5 Secrets to Perfect Grilled Beef',
    excerpt: 'After years of cooking beef for private clients, these five fundamentals make the difference between good and unforgettable.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
    category: 'Chef Tips',
    author: 'Chef Harrizona',
    date: '2026-08-10',
    readTime: 5,
    featured: true,
  },
  {
    id: 'b2',
    slug: 'how-to-plan-a-private-dinner-party',
    title: 'How to Plan a Private Dinner Party',
    excerpt: 'Everything you need to know to host a flawless private dinner — from invitations to the perfect closing course.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    category: 'Events',
    author: 'Chef Harrizona',
    date: '2026-07-22',
    readTime: 7,
    featured: true,
  },
  {
    id: 'b3',
    slug: 'kenyan-ingredients-every-chef-should-know',
    title: 'Kenyan Ingredients Every Chef Should Know',
    excerpt: 'From managu to kunde, arrow roots to fresh tilapia — the building blocks of a modern Kenyan kitchen.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80',
    category: 'Culinary Stories',
    author: 'Chef Harrizona',
    date: '2026-07-05',
    readTime: 6,
  },
  {
    id: 'b4',
    slug: 'the-art-of-the-tasting-menu',
    title: 'The Art of the Tasting Menu',
    excerpt: 'Why a well-designed tasting menu is the purest expression of a chef\'s vision, and how to build one.',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80',
    category: 'Recipes',
    author: 'Chef Harrizona',
    date: '2026-06-18',
    readTime: 8,
  },
]

// ─── FAQ ─────────────────────────────────────────────────────────────────────
export interface FAQItem {
  question: string
  answer: string
}

export const faqItems: FAQItem[] = [
  {
    question: 'Do you provide private dining at home?',
    answer: 'Yes. Chef Harrizona provides full in-home dining experiences — bringing the restaurant to your table, complete with preparation, service and kitchen clean-up.',
  },
  {
    question: 'How far in advance should I book?',
    answer: 'We recommend booking at least 2 weeks in advance for private dining and small events. For weddings and large events, 2–3 months notice ensures the best availability and preparation.',
  },
  {
    question: 'Can you accommodate dietary requirements?',
    answer: 'Absolutely. Chef Harrizona accommodates vegetarian, vegan, gluten-free, dairy-free and most allergy-specific requirements. Please detail your needs when booking so we can design your menu accordingly.',
  },
  {
    question: 'Do you provide catering equipment and staff?',
    answer: 'Yes. We can supply all necessary cooking and serving equipment. For larger events we also provide trained serving staff. This is confirmed and priced during your consultation.',
  },
  {
    question: 'Is a deposit required to secure a booking?',
    answer: 'Yes. A 40% deposit is required to confirm your booking. The remaining balance is due 48 hours before your event. Full payment terms are included in your booking confirmation.',
  },
  {
    question: 'Can menus be fully customised?',
    answer: 'Yes. Every menu is designed around you — your preferences, dietary needs, cuisine style and the occasion. A consultation call or tasting session is included for events of 10 or more guests.',
  },
  {
    question: 'Do you travel outside Nairobi?',
    answer: 'Chef Harrizona primarily serves Nairobi and surrounding areas. Travel to other counties is possible and subject to a travel fee. Contact us with your event location for a specific quote.',
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'Cancellations made more than 7 days before the event receive a full deposit refund. Cancellations within 7 days forfeit the deposit. Full details are provided in the booking agreement.',
  },
]

// ─── Meal Kits ────────────────────────────────────────────────────────────────
export interface MealKit {
  id: string
  name: string
  slug: string
  description: string
  shortDesc: string
  image: string
  serves: string
  time: string
  difficulty: 'Easy' | 'Beginner' | 'Intermediate'
  price: number
  originalPrice: number
  rating: number
  reviews: number
  badge?: 'Popular' | 'New' | 'Best Value'
  features: string[]
  ingredients: string[]
  dietary?: string[]
  available: boolean
}

export const mealKits: MealKit[] = [
  {
    id: 'mk1',
    name: 'Traditional Nyama Choma Kit',
    slug: 'nyama-choma-kit',
    description: 'Everything you need for an authentic Kenyan barbecue experience. Premium goat meat with traditional spices and sides.',
    shortDesc: 'Authentic Kenyan BBQ with premium goat, traditional spices, ugali and kachumbari.',
    image: '/nyama-choma.jpeg',
    serves: '4–6 people',
    time: '45 minutes',
    difficulty: 'Easy',
    price: 3200,
    originalPrice: 4000,
    rating: 4.8,
    reviews: 124,
    badge: 'Popular',
    features: ['Free delivery in Nairobi', 'Video tutorial included', 'Harrizona Cullinaries\' signature spices'],
    ingredients: [
      '2kg premium goat meat',
      'Traditional spice blend',
      'Ugali flour (1kg)',
      'Fresh kachumbari vegetables',
      'Charcoal for grilling',
      'Detailed recipe card',
    ],
    available: true,
  },
  {
    id: 'mk2',
    name: 'Coastal Samaki wa Nazi Kit',
    slug: 'samaki-wa-nazi-kit',
    description: 'Bring the flavors of the Kenyan coast to your home. Fresh fish with coconut curry and aromatic coastal spices.',
    shortDesc: 'Fresh tilapia or kingfish in rich coconut curry with authentic coastal spices and basmati.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80',
    serves: '3–4 people',
    time: '30 minutes',
    difficulty: 'Beginner',
    price: 2800,
    originalPrice: 3400,
    rating: 4.9,
    reviews: 89,
    features: ['Same-day delivery', 'Sustainably sourced fish', 'Authentic coastal recipe'],
    ingredients: [
      '1.5kg fresh tilapia/kingfish',
      'Fresh coconut milk',
      'Coastal spice mix',
      'Curry leaves & coriander',
      'Basmati rice (500g)',
      'Step-by-step guide',
    ],
    dietary: ['Gluten Free', 'Dairy Free'],
    available: true,
  },
  {
    id: 'mk3',
    name: 'Pilau Masala Feast Kit',
    slug: 'pilau-masala-kit',
    description: 'Master the art of Kenyan pilau with our complete kit. Aromatic spices and premium ingredients for the perfect pilau.',
    shortDesc: 'Fragrant Kenyan pilau with Harrizona\'s secret masala blend, premium rice and tender meat.',
    image: '/pilau-masala.jpeg',
    serves: '6–8 people',
    time: '60 minutes',
    difficulty: 'Intermediate',
    price: 3500,
    originalPrice: 4200,
    rating: 4.7,
    reviews: 156,
    features: ['Premium ingredients', 'Family recipe secrets', 'Cooking tips video'],
    ingredients: [
      '2kg premium basmati rice',
      'Harrizona Cullinaries\' pilau masala',
      '1.5kg beef/chicken',
      'Caramelized onions',
      'Fresh garlic & ginger',
      'Traditional cooking technique guide',
    ],
    available: true,
  },
  {
    id: 'mk4',
    name: 'Vegetarian Githeri Kit',
    slug: 'githeri-kit',
    description: 'Nutritious and delicious vegetarian Kenyan meal. Perfectly seasoned beans and maize with fresh vegetables.',
    shortDesc: 'Hearty Kenyan githeri with premium mixed beans, maize and a nourishing traditional seasoning.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
    serves: '4–5 people',
    time: '40 minutes',
    difficulty: 'Easy',
    price: 1800,
    originalPrice: 2200,
    rating: 4.6,
    reviews: 203,
    features: ['Vegan friendly', 'High protein', 'Quick cooking'],
    ingredients: [
      'Premium mixed beans',
      'White maize kernels',
      'Fresh vegetables mix',
      'Traditional seasoning',
      'Coconut oil',
      'Nutritionist-approved recipe',
    ],
    dietary: ['Vegan', 'Gluten Free', 'Dairy Free'],
    available: true,
  },
  {
    id: 'mk5',
    name: 'Sukuma Wiki Deluxe Kit',
    slug: 'sukuma-wiki-kit',
    description: 'Elevate everyday sukuma wiki into a gourmet experience. Fresh greens with special seasoning and accompaniments.',
    shortDesc: 'Farm-fresh sukuma wiki elevated with Harrizona\'s special seasoning and premium accompaniments.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
    serves: '3–4 people',
    time: '25 minutes',
    difficulty: 'Beginner',
    price: 1200,
    originalPrice: 1500,
    rating: 4.5,
    reviews: 178,
    features: ['Farm fresh vegetables', 'Multiple cooking styles', 'Budget friendly'],
    ingredients: [
      'Fresh sukuma wiki (2 bunches)',
      'Premium maize flour',
      'Special seasoning blend',
      'Fresh tomatoes & onions',
      'Cooking oil',
      'Enhanced recipe variations',
    ],
    dietary: ['Vegan', 'Gluten Free', 'Dairy Free'],
    available: true,
  },
  {
    id: 'mk6',
    name: 'Mukimo Traditional Kit',
    slug: 'mukimo-kit',
    description: 'Authentic Kikuyu mukimo with all traditional ingredients. Perfect comfort food with a modern twist.',
    shortDesc: 'Classic Kikuyu mukimo — mashed potato with pumpkin leaves, green maize and traditional beans.',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80',
    serves: '5–6 people',
    time: '50 minutes',
    difficulty: 'Intermediate',
    price: 2400,
    originalPrice: 3000,
    rating: 4.8,
    reviews: 92,
    features: ['Traditional recipe', 'Cultural significance notes', 'Comfort food'],
    ingredients: [
      'Irish potatoes (2kg)',
      'Fresh pumpkin leaves',
      'Green maize',
      'Traditional beans',
      'Seasoning blend',
      'Cultural story & recipe',
    ],
    dietary: ['Vegetarian', 'Gluten Free'],
    available: true,
  },
  {
    id: 'mk7',
    name: 'Chapati & Beef Stew Kit',
    slug: 'chapati-beef-stew-kit',
    description: 'Perfect combination of soft chapatis and rich beef stew. A complete meal that brings families together.',
    shortDesc: 'Fluffy layered chapatis with rich slow-cooked beef stew — the ultimate Kenyan comfort meal.',
    image: '/chapati.jpeg',
    serves: '4–6 people',
    time: '75 minutes',
    difficulty: 'Intermediate',
    price: 3800,
    originalPrice: 4500,
    rating: 4.9,
    reviews: 167,
    badge: 'Popular',
    features: ['Perfect chapati technique', 'Tender beef guaranteed', 'Family favourite'],
    ingredients: [
      'Premium wheat flour',
      '1.5kg tender beef cuts',
      'Chapati-making kit',
      'Stew spice blend',
      'Fresh vegetables',
      'Master class video access',
    ],
    available: true,
  },
  {
    id: 'mk8',
    name: 'Kenyan Breakfast Kit',
    slug: 'kenyan-breakfast-kit',
    description: 'Start your day the Kenyan way. Traditional breakfast items including mandazi, chai, and accompaniments.',
    shortDesc: 'Golden mandazi, premium chai and classic Kenyan breakfast accompaniments — morning sorted.',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80',
    serves: '2–4 people',
    time: '35 minutes',
    difficulty: 'Easy',
    price: 1600,
    originalPrice: 2000,
    rating: 4.7,
    reviews: 134,
    features: ['Perfect morning start', 'Traditional flavours', 'Easy preparation'],
    ingredients: [
      'Mandazi flour mix',
      'Premium tea leaves',
      'Fresh milk',
      'Coconut for flavour',
      'Breakfast spice blend',
      'Morning routine recipe',
    ],
    dietary: ['Vegetarian'],
    available: true,
  },
]
