import type { Package, Deal, Hotel, ActivityLog, ApprovalRequest, DashboardStats, RevenueDataPoint, AgentPerformance, User } from '@/types';

// ─── Users ───────────────────────────────────────────────────────────────────
export const mockUsers: User[] = [
  { id: 'u1', name: 'Arjun Sharma', email: 'arjun@travelportal.com', role: 'admin', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun', createdAt: new Date('2024-01-15') },
  { id: 'u2', name: 'Priya Nair', email: 'priya@travelportal.com', role: 'manager', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya', createdAt: new Date('2024-02-20') },
  { id: 'u3', name: 'Rahul Mehta', email: 'rahul@travelportal.com', role: 'agent', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rahul', createdAt: new Date('2024-03-10') },
  { id: 'u4', name: 'Sneha Iyer', email: 'sneha@travelportal.com', role: 'agent', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sneha', createdAt: new Date('2024-04-05') },
  { id: 'u5', name: 'Vikram Patel', email: 'vikram@travelportal.com', role: 'manager', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vikram', createdAt: new Date('2024-05-12') },
];

// ─── Hotels ──────────────────────────────────────────────────────────────────
export const mockHotels: Hotel[] = [
  { id: 'h1', name: 'The Leela Palace', stars: 5, location: 'Udaipur', country: 'India', roomTypes: ['Deluxe', 'Suite', 'Royal Suite'], mealPlans: ['CP', 'MAP', 'AP'], images: [], tier: 'luxury', pricePerNight: 28000, active: true },
  { id: 'h2', name: 'Radisson Blu', stars: 4, location: 'Goa', country: 'India', roomTypes: ['Superior', 'Deluxe', 'Suite'], mealPlans: ['EP', 'CP', 'MAP'], images: [], tier: 'deluxe', pricePerNight: 9500, active: true },
  { id: 'h3', name: 'Zostel Plus', stars: 3, location: 'Manali', country: 'India', roomTypes: ['Standard', 'Deluxe'], mealPlans: ['EP', 'CP'], images: [], tier: 'standard', pricePerNight: 3500, active: true },
  { id: 'h4', name: 'Anantara Resort', stars: 5, location: 'Maldives', country: 'Maldives', roomTypes: ['Water Villa', 'Beach Villa', 'Ocean Suite'], mealPlans: ['AP', 'MAP'], images: [], tier: 'luxury', pricePerNight: 85000, active: true },
  { id: 'h5', name: 'OYO Townhouse', stars: 2, location: 'Rishikesh', country: 'India', roomTypes: ['Standard', 'Deluxe'], mealPlans: ['EP', 'CP'], images: [], tier: 'standard', pricePerNight: 1800, active: true },
  { id: 'h6', name: 'Vivanta by Taj', stars: 4, location: 'Coorg', country: 'India', roomTypes: ['Deluxe', 'Premier', 'Suite'], mealPlans: ['CP', 'MAP'], images: [], tier: 'deluxe', pricePerNight: 12000, active: true },
];

// ─── Packages ────────────────────────────────────────────────────────────────
export const mockPackages: Package[] = [
  {
    id: 'pkg1',
    name: 'Royal Rajasthan Heritage Tour',
    slug: 'royal-rajasthan-heritage-tour',
    category: 'luxury',
    destinations: [{ id: 'd1', name: 'Jaipur', country: 'India', code: 'JAI' }, { id: 'd2', name: 'Udaipur', country: 'India', code: 'UDR' }, { id: 'd3', name: 'Jodhpur', country: 'India', code: 'JDH' }],
    durationDays: 8, durationNights: 7,
    shortDescription: 'Experience the grandeur of Rajasthan — palaces, forts, and desert landscapes in ultimate luxury.',
    status: 'published',
    itinerary: [
      { id: 'it1', day: 1, title: 'Arrival in Jaipur — The Pink City', description: 'Welcome to the royal city! Check-in at your palace hotel, evening aarti at Birla Temple.', meals: { breakfast: false, lunch: false, dinner: true }, activities: ['Airport transfer', 'Hotel check-in', 'Birla Temple visit'], hotelId: 'h1', hotelName: 'The Leela Palace' },
      { id: 'it2', day: 2, title: 'Jaipur City Exploration', description: 'Full day exploring Amber Fort, Hawa Mahal, City Palace, and Jantar Mantar.', meals: { breakfast: true, lunch: true, dinner: true }, activities: ['Amber Fort', 'Hawa Mahal', 'City Palace', 'Jantar Mantar'], hotelId: 'h1', hotelName: 'The Leela Palace' },
    ],
    inclusions: ['Accommodation in 5-star heritage hotels', 'Daily breakfast & dinner', 'Air-conditioned private cab', 'English-speaking guide', 'All monument entry fees', 'Welcome drink & fruit basket'],
    exclusions: ['International/domestic flights', 'Lunch', 'Personal expenses', 'Camera fees', 'Tips & gratuities'],
    addOns: ['Camel safari (₹2,500/person)', 'Hot air balloon ride (₹9,000/person)', 'Cultural evening with dinner (₹1,800/person)'],
    termsAndConditions: 'Standard cancellation policy applies. Full refund 30 days before departure. 50% refund 15-29 days before. No refund within 14 days.',
    priceVariants: [
      { id: 'pv1', occupancyType: 'single', basePrice: 95000, season: 'peak' },
      { id: 'pv2', occupancyType: 'double', basePrice: 68000, season: 'peak' },
      { id: 'pv3', occupancyType: 'double', basePrice: 55000, season: 'off_peak' },
    ],
    groupPricing: [{ minPax: 10, maxPax: 20, pricePerPerson: 62000 }, { minPax: 21, maxPax: 50, pricePerPerson: 55000 }],
    currency: 'INR', taxEnabled: true, taxPercent: 5,
    internalCost: 45000, sellingPrice: 68000,
    hotels: [{ id: 'h1', name: 'The Leela Palace', tier: 'luxury', stars: 5, location: 'Udaipur', roomType: 'Deluxe Room', mealPlan: 'map' }],
    coverImage: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=800', gallery: [],
    videoUrl: '', metaTitle: 'Royal Rajasthan Heritage Tour | 8 Days 7 Nights Luxury Package', metaDescription: 'Explore the royal cities of Jaipur, Udaipur, and Jodhpur in luxury. 8-day heritage tour with palace stays.',
    featured: true, visibility: 'public',
    views: 4823, inquiries: 342, bookings: 87, revenue: 5916000,
    createdBy: 'u2', createdAt: new Date('2024-06-01'), updatedAt: new Date('2024-11-15'), notes: 'High-performing package — update hotel rates for peak season 2025.',
  },
  {
    id: 'pkg2',
    name: 'Maldives Overwater Romance',
    slug: 'maldives-overwater-romance',
    category: 'honeymoon',
    destinations: [{ id: 'd4', name: 'Malé', country: 'Maldives', code: 'MLE' }],
    durationDays: 6, durationNights: 5,
    shortDescription: 'Overwater bungalows, crystal-clear lagoons, and sunset dinners — the ultimate honeymoon escape.',
    status: 'published',
    itinerary: [],
    inclusions: ['5-star overwater villa stay', 'All meals (AP plan)', 'Seaplane transfers', 'Snorkeling gear', 'Couple spa (60 min)', 'Sunset cruise'],
    exclusions: ['International flights', 'Scuba diving', 'Water sports (chargeable)', 'Alcohol'],
    addOns: ['Private beach dinner (₹18,000/couple)', 'Scuba diving session (₹6,500/person)'],
    termsAndConditions: 'Full payment required 45 days in advance. No refund within 30 days of travel.',
    priceVariants: [{ id: 'pv4', occupancyType: 'double', basePrice: 185000, season: 'peak' }, { id: 'pv5', occupancyType: 'double', basePrice: 155000, season: 'off_peak' }],
    groupPricing: [],
    currency: 'INR', taxEnabled: true, taxPercent: 5,
    internalCost: 110000, sellingPrice: 155000,
    hotels: [{ id: 'h4', name: 'Anantara Resort', tier: 'luxury', stars: 5, location: 'Maldives', roomType: 'Water Villa', mealPlan: 'ap' }],
    coverImage: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800', gallery: [],
    videoUrl: '', metaTitle: 'Maldives Honeymoon Package | 6 Days 5 Nights All-Inclusive', metaDescription: 'Romantic Maldives honeymoon with overwater villa, all meals, seaplane transfers.',
    featured: true, visibility: 'public',
    views: 7241, inquiries: 621, bookings: 134, revenue: 20770000,
    createdBy: 'u2', createdAt: new Date('2024-07-10'), updatedAt: new Date('2024-12-01'), notes: '',
  },
  {
    id: 'pkg3',
    name: 'Goa Beach & Party Getaway',
    slug: 'goa-beach-party-getaway',
    category: 'group',
    destinations: [{ id: 'd5', name: 'Goa', country: 'India', code: 'GOI' }],
    durationDays: 5, durationNights: 4,
    shortDescription: 'Sun, sand, and parties — the perfect group trip to Goa with beach stays and nightlife included.',
    status: 'published',
    itinerary: [],
    inclusions: ['4-star beach resort stay', 'Daily breakfast', 'North & South Goa tour', 'Sunset cruise with drinks', 'Airport/station transfers'],
    exclusions: ['Flights', 'Lunch & dinner', 'Personal expenses', 'Water sports'],
    addOns: ['Water sports package (₹2,200/person)', 'Baga nightclub entry (₹1,500/person)'],
    termsAndConditions: 'Standard cancellation policy applies.',
    priceVariants: [{ id: 'pv6', occupancyType: 'double', basePrice: 18000, season: 'peak' }, { id: 'pv7', occupancyType: 'triple', basePrice: 15000, season: 'peak' }],
    groupPricing: [{ minPax: 15, maxPax: 30, pricePerPerson: 14500 }],
    currency: 'INR', taxEnabled: true, taxPercent: 5,
    internalCost: 10000, sellingPrice: 18000,
    hotels: [{ id: 'h2', name: 'Radisson Blu', tier: 'deluxe', stars: 4, location: 'Goa', roomType: 'Superior Room', mealPlan: 'cp' }],
    coverImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800', gallery: [],
    videoUrl: '', metaTitle: 'Goa Group Package | 5 Days 4 Nights Beach & Party', metaDescription: 'Best Goa group travel package with beach resort, tours, and nightlife inclusions.',
    featured: false, visibility: 'public',
    views: 3102, inquiries: 289, bookings: 56, revenue: 1008000,
    createdBy: 'u3', createdAt: new Date('2024-08-05'), updatedAt: new Date('2024-10-20'), notes: 'Popular for college groups.',
  },
  {
    id: 'pkg4',
    name: 'Manali Adventure & Snow Trek',
    slug: 'manali-adventure-snow-trek',
    category: 'adventure',
    destinations: [{ id: 'd6', name: 'Manali', country: 'India', code: 'KUU' }],
    durationDays: 7, durationNights: 6,
    shortDescription: 'Conquer snow-capped peaks, riverside camps, and thrilling treks across the mighty Himalayas.',
    status: 'pending_approval',
    itinerary: [],
    inclusions: ['Boutique hotel stay', 'Daily breakfast & dinner', 'Rohtang Pass tour', 'Solang Valley snow activities', 'Beas river camping', 'Trekking guide'],
    exclusions: ['Delhi-Manali travel', 'Lunch', 'Snowmobile & sledding (chargeable)', 'Travel insurance'],
    addOns: ['Paragliding (₹3,500/person)', 'ATV ride (₹2,000/person)'],
    termsAndConditions: 'Weather conditions may alter itinerary. Full refund for cancellations 21+ days in advance.',
    priceVariants: [{ id: 'pv8', occupancyType: 'double', basePrice: 24000, season: 'peak' }, { id: 'pv9', occupancyType: 'triple', basePrice: 20000, season: 'peak' }],
    groupPricing: [],
    currency: 'INR', taxEnabled: true, taxPercent: 5,
    internalCost: 14000, sellingPrice: 24000,
    hotels: [{ id: 'h3', name: 'Zostel Plus', tier: 'standard', stars: 3, location: 'Manali', roomType: 'Deluxe Room', mealPlan: 'cp' }],
    coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', gallery: [],
    videoUrl: '', metaTitle: 'Manali Adventure Package | 7 Days Snow Trek & Activities', metaDescription: 'Adventure trip to Manali with snow trekking, Rohtang Pass, and riverside camping.',
    featured: false, visibility: 'public',
    views: 1847, inquiries: 98, bookings: 0, revenue: 0,
    createdBy: 'u3', createdAt: new Date('2024-11-01'), updatedAt: new Date('2024-11-25'), notes: 'Waiting for manager approval.',
  },
  {
    id: 'pkg5',
    name: 'Coorg Coffee Trails & Wellness',
    slug: 'coorg-coffee-trails-wellness',
    category: 'family',
    destinations: [{ id: 'd7', name: 'Coorg', country: 'India', code: 'CRG' }],
    durationDays: 4, durationNights: 3,
    shortDescription: 'Misty coffee estates, cascading waterfalls, and wellness retreats in the Scotland of India.',
    status: 'draft',
    itinerary: [],
    inclusions: ['Deluxe resort stay', 'Daily breakfast', 'Coffee estate tour', 'Abbey Falls visit', 'Yoga & spa session'],
    exclusions: ['Travel to Coorg', 'Lunch & dinner', 'Personal shopping'],
    addOns: ['Ayurvedic massage (₹3,200/person)', 'Jeep safari (₹2,500/vehicle)'],
    termsAndConditions: 'Standard policy applies.',
    priceVariants: [{ id: 'pv10', occupancyType: 'double', basePrice: 22000, season: 'off_peak' }],
    groupPricing: [],
    currency: 'INR', taxEnabled: true, taxPercent: 5,
    internalCost: 13000, sellingPrice: 22000,
    hotels: [{ id: 'h6', name: 'Vivanta by Taj', tier: 'deluxe', stars: 4, location: 'Coorg', roomType: 'Premier Room', mealPlan: 'cp' }],
    coverImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', gallery: [],
    videoUrl: '', metaTitle: 'Coorg Family Package | 4 Days Coffee & Nature Retreat', metaDescription: 'Family getaway to Coorg with coffee estate tours, waterfalls, and wellness activities.',
    featured: false, visibility: 'internal',
    views: 0, inquiries: 0, bookings: 0, revenue: 0,
    createdBy: 'u4', createdAt: new Date('2024-11-20'), updatedAt: new Date('2024-11-20'), notes: 'Draft — need to add more itinerary days.',
  },
];

// ─── Deals ───────────────────────────────────────────────────────────────────
export const mockDeals: Deal[] = [
  {
    id: 'deal1', name: 'New Year 2025 Mega Sale', type: 'percentage',
    applicableTo: 'all', applicablePackageIds: [], applicableCategories: [],
    discountValue: 20, validFrom: new Date('2024-12-25'), validTo: new Date('2025-01-15'),
    usageLimit: 500, usedCount: 287, perCustomerLimit: 1, couponCode: 'NY2025SAVE20',
    bannerText: '20% OFF — New Year Special!', canStack: false, status: 'active',
    createdAt: new Date('2024-12-01'), updatedAt: new Date('2024-12-01'),
  },
  {
    id: 'deal2', name: 'Honeymoon Special — Flat ₹10,000 Off', type: 'flat',
    applicableTo: 'category', applicablePackageIds: [], applicableCategories: ['honeymoon'],
    discountValue: 10000, validFrom: new Date('2024-11-01'), validTo: new Date('2025-02-28'),
    usageLimit: 100, usedCount: 62, perCustomerLimit: 1, couponCode: 'HONEY10K',
    bannerText: '₹10,000 OFF for Couples!', canStack: false, status: 'active',
    createdAt: new Date('2024-10-20'), updatedAt: new Date('2024-10-20'),
  },
  {
    id: 'deal3', name: 'Early Bird — Book 90 Days Ahead', type: 'early_bird',
    applicableTo: 'all', applicablePackageIds: [], applicableCategories: [],
    discountValue: 15, validFrom: new Date('2024-09-01'), validTo: new Date('2025-06-30'),
    usageLimit: undefined, usedCount: 134, perCustomerLimit: 2, couponCode: 'EARLYBIRD15',
    bannerText: 'Book Early, Save 15%!', canStack: true, status: 'active',
    createdAt: new Date('2024-08-25'), updatedAt: new Date('2024-08-25'),
  },
  {
    id: 'deal4', name: 'Flash Sale — Last 5 Seats Goa', type: 'last_minute',
    applicableTo: 'specific', applicablePackageIds: ['pkg3'], applicableCategories: [],
    discountValue: 25, validFrom: new Date('2024-11-28'), validTo: new Date('2024-12-05'),
    usageLimit: 5, usedCount: 5, perCustomerLimit: 1, couponCode: 'GOAFLASH25',
    bannerText: 'LAST MINUTE — 25% OFF!', canStack: false, status: 'expired',
    createdAt: new Date('2024-11-27'), updatedAt: new Date('2024-12-05'),
  },
  {
    id: 'deal5', name: 'Republic Day Sale', type: 'percentage',
    applicableTo: 'all', applicablePackageIds: [], applicableCategories: [],
    discountValue: 26, validFrom: new Date('2025-01-24'), validTo: new Date('2025-01-28'),
    usageLimit: 200, usedCount: 0, perCustomerLimit: 1, couponCode: 'REPUBLIC26',
    bannerText: '26% OFF — Republic Day Sale!', canStack: false, status: 'scheduled',
    createdAt: new Date('2024-12-15'), updatedAt: new Date('2024-12-15'),
  },
];

// ─── Activity Log ────────────────────────────────────────────────────────────
export const mockActivityLog: ActivityLog[] = [
  { id: 'al1', userId: 'u2', userName: 'Priya Nair', action: 'Published package', entity: 'package', entityId: 'pkg1', entityName: 'Royal Rajasthan Heritage Tour', timestamp: new Date('2024-11-15T14:32:00') },
  { id: 'al2', userId: 'u3', userName: 'Rahul Mehta', action: 'Submitted for approval', entity: 'package', entityId: 'pkg4', entityName: 'Manali Adventure & Snow Trek', timestamp: new Date('2024-11-25T10:15:00') },
  { id: 'al3', userId: 'u1', userName: 'Arjun Sharma', action: 'Created deal', entity: 'deal', entityId: 'deal1', entityName: 'New Year 2025 Mega Sale', timestamp: new Date('2024-12-01T09:00:00') },
  { id: 'al4', userId: 'u4', userName: 'Sneha Iyer', action: 'Created draft', entity: 'package', entityId: 'pkg5', entityName: 'Coorg Coffee Trails & Wellness', timestamp: new Date('2024-11-20T16:44:00') },
  { id: 'al5', userId: 'u2', userName: 'Priya Nair', action: 'Updated pricing', entity: 'package', entityId: 'pkg2', entityName: 'Maldives Overwater Romance', timestamp: new Date('2024-12-01T11:20:00') },
  { id: 'al6', userId: 'u5', userName: 'Vikram Patel', action: 'Approved package', entity: 'package', entityId: 'pkg3', entityName: 'Goa Beach & Party Getaway', timestamp: new Date('2024-10-20T15:05:00') },
  { id: 'al7', userId: 'u3', userName: 'Rahul Mehta', action: 'Added itinerary days', entity: 'package', entityId: 'pkg4', entityName: 'Manali Adventure & Snow Trek', timestamp: new Date('2024-11-24T13:30:00') },
];

// ─── Approvals ───────────────────────────────────────────────────────────────
export const mockApprovals: ApprovalRequest[] = [
  {
    id: 'apr1', packageId: 'pkg4', packageName: 'Manali Adventure & Snow Trek',
    submittedBy: 'u3', submittedByName: 'Rahul Mehta',
    submittedAt: new Date('2024-11-25T10:15:00'), status: 'pending',
    comments: [
      { id: 'c1', userId: 'u3', userName: 'Rahul Mehta', text: 'Ready for review. Added full itinerary and pricing for peak season.', createdAt: new Date('2024-11-25T10:15:00') },
    ],
  },
];

// ─── Dashboard Stats ─────────────────────────────────────────────────────────
export const mockDashboardStats: DashboardStats = {
  totalPackages: 5, publishedPackages: 3, pendingApprovals: 1, activeDeals: 3,
  totalRevenue: 27694000, monthlyRevenue: 4200000, totalViews: 17013, totalBookings: 277,
};

// ─── Revenue Chart Data ───────────────────────────────────────────────────────
export const mockRevenueData: RevenueDataPoint[] = [
  { month: 'Jul', revenue: 1820000, bookings: 24, inquiries: 189 },
  { month: 'Aug', revenue: 2140000, bookings: 31, inquiries: 247 },
  { month: 'Sep', revenue: 1950000, bookings: 28, inquiries: 214 },
  { month: 'Oct', revenue: 3100000, bookings: 44, inquiries: 312 },
  { month: 'Nov', revenue: 4200000, bookings: 58, inquiries: 428 },
  { month: 'Dec', revenue: 5600000, bookings: 72, inquiries: 541 },
];

// ─── Agent Performance ───────────────────────────────────────────────────────
export const mockAgentPerformance: AgentPerformance[] = [
  { userId: 'u2', name: 'Priya Nair', packagesCreated: 2, packagesPublished: 2, totalRevenue: 26686000, conversionRate: 24.2 },
  { userId: 'u3', name: 'Rahul Mehta', packagesCreated: 2, packagesPublished: 1, totalRevenue: 1008000, conversionRate: 19.4 },
  { userId: 'u4', name: 'Sneha Iyer', packagesCreated: 1, packagesPublished: 0, totalRevenue: 0, conversionRate: 0 },
  { userId: 'u5', name: 'Vikram Patel', packagesCreated: 0, packagesPublished: 0, totalRevenue: 0, conversionRate: 0 },
];

// ─── Current User (mock session) ─────────────────────────────────────────────
export const mockCurrentUser: User = mockUsers[0]; // Admin by default for demo
