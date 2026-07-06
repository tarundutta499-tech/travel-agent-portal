export type UserRole = 'admin' | 'manager' | 'agent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
}

export type PackageStatus = 'draft' | 'pending_approval' | 'published' | 'archived';
export type PackageCategory = 'honeymoon' | 'family' | 'luxury' | 'adventure' | 'group' | 'custom';

export interface Destination {
  id: string;
  name: string;
  country: string;
  code: string;
}

export interface ItineraryDay {
  id: string;
  day: number;
  title: string;
  description: string;
  meals: { breakfast: boolean; lunch: boolean; dinner: boolean };
  activities: string[];
  hotelId?: string;
  hotelName?: string;
}

export interface PriceVariant {
  id: string;
  occupancyType: 'single' | 'double' | 'triple' | 'child_with_bed' | 'child_without_bed';
  basePrice: number;
  season: 'peak' | 'off_peak' | 'festival';
  seasonDateRange?: { start: string; end: string };
}

export interface GroupPricingTier {
  minPax: number;
  maxPax: number;
  pricePerPerson: number;
}

export interface HotelOption {
  id: string;
  name: string;
  tier: 'standard' | 'deluxe' | 'luxury';
  stars: number;
  location: string;
  roomType: string;
  mealPlan: 'ep' | 'cp' | 'map' | 'ap';
}

export interface Package {
  id: string;
  name: string;
  slug: string;
  category: PackageCategory;
  destinations: Destination[];
  durationDays: number;
  durationNights: number;
  shortDescription: string;
  status: PackageStatus;
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  addOns: string[];
  termsAndConditions: string;
  priceVariants: PriceVariant[];
  groupPricing: GroupPricingTier[];
  currency: string;
  taxEnabled: boolean;
  taxPercent: number;
  internalCost: number;
  sellingPrice: number;
  hotels: HotelOption[];
  coverImage?: string;
  gallery: string[];
  videoUrl?: string;
  metaTitle: string;
  metaDescription: string;
  featured: boolean;
  publishAt?: Date;
  visibility: 'public' | 'unlisted' | 'internal';
  views: number;
  inquiries: number;
  bookings: number;
  revenue: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
}

export type DealType = 'percentage' | 'flat' | 'bundle' | 'early_bird' | 'last_minute' | 'coupon';
export type DealStatus = 'active' | 'scheduled' | 'expired' | 'disabled';

export interface Deal {
  id: string;
  name: string;
  type: DealType;
  applicableTo: 'all' | 'category' | 'specific';
  applicablePackageIds: string[];
  applicableCategories: PackageCategory[];
  discountValue: number;
  validFrom: Date;
  validTo: Date;
  usageLimit?: number;
  usedCount: number;
  perCustomerLimit?: number;
  couponCode?: string;
  bannerText: string;
  canStack: boolean;
  status: DealStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Hotel {
  id: string;
  name: string;
  stars: number;
  location: string;
  country: string;
  roomTypes: string[];
  mealPlans: string[];
  images: string[];
  tier: 'standard' | 'deluxe' | 'luxury';
  pricePerNight: number;
  active: boolean;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  action: string;
  entity: string;
  entityId: string;
  entityName: string;
  details?: string;
  timestamp: Date;
}

export interface ApprovalRequest {
  id: string;
  packageId: string;
  packageName: string;
  submittedBy: string;
  submittedByName: string;
  submittedAt: Date;
  status: 'pending' | 'approved' | 'changes_requested';
  comments: ApprovalComment[];
}

export interface ApprovalComment {
  id: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: Date;
}

export interface DashboardStats {
  totalPackages: number;
  publishedPackages: number;
  pendingApprovals: number;
  activeDeals: number;
  totalRevenue: number;
  monthlyRevenue: number;
  totalViews: number;
  totalBookings: number;
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  bookings: number;
  inquiries: number;
}

export interface AgentPerformance {
  userId: string;
  name: string;
  packagesCreated: number;
  packagesPublished: number;
  totalRevenue: number;
  conversionRate: number;
}
