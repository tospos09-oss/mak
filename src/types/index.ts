export type ActivityCategory =
  | 'reunion'
  | 'conference'
  | 'formation'
  | 'shooting'
  | 'evenement'
  | 'tournage'
  | 'coworking'
  | 'podcast';

export type AlgiersCommune =
  | 'Alger-Centre'
  | 'Hydra'
  | 'El Biar'
  | 'Bab Ezzouar'
  | 'Kouba'
  | 'Bir Mourad Raïs'
  | 'Dely Ibrahim'
  | 'Hussein Dey'
  | 'Cheraga'
  | 'Sidi M\'Hamed'
  | 'Ben Aknoun'
  | 'Staoueli'
  | 'Bordj El Kiffan';

export type PricingType = 'unit' | 'person' | 'flat';

export interface AddOn {
  id: string;
  spaceId: string;
  name: string;
  description: string;
  photo?: string;
  price: number; // in DA
  pricingType: PricingType;
  maxQuantity: number;
  isActive: boolean;
}

export interface SpacePricing {
  pricePerHour: number; // in DA
  minHours: number;
  dayPrice?: number; // in DA (discounted full day 8-10h)
  weekendRatePerHour?: number; // Friday/Saturday rate in DA
  securityDeposit?: number; // Caution in DA
}

export interface BlockedSlot {
  id: string;
  spaceId: string;
  date: string; // YYYY-MM-DD
  startHour?: number; // e.g. 9
  endHour?: number; // e.g. 14
  wholeDay?: boolean;
  reason?: string;
}

export interface DaySchedule {
  isOpen: boolean;
  openTime: string; // e.g. "08:00"
  closeTime: string; // e.g. "20:00"
}

export interface WeeklySchedule {
  0: DaySchedule; // Dimanche (Algeria work week)
  1: DaySchedule; // Lundi
  2: DaySchedule; // Mardi
  3: DaySchedule; // Mercredi
  4: DaySchedule; // Jeudi
  5: DaySchedule; // Vendredi (Weekend)
  6: DaySchedule; // Samedi (Weekend)
}

export type SpaceStatus = 'draft' | 'pending_approval' | 'published' | 'paused';

export interface Space {
  id: string;
  title: string;
  slug: string;
  description: string;
  hostId: string;
  hostName: string;
  hostAvatar: string;
  hostResponseRate: number; // e.g. 98%
  hostResponseTime: string; // e.g. "< 15 minutes"
  hostPhone: string;
  hostWhatsApp: string;
  commune: AlgiersCommune;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  primaryCategory: ActivityCategory;
  allowedActivities: ActivityCategory[];
  surface: number; // in m²
  capacity: number; // max persons
  pricing: SpacePricing;
  status: SpaceStatus;
  photos: string[];
  amenities: string[];
  rules: string[];
  cancellationPolicy: 'flexible' | 'moderate' | 'strict';
  weeklySchedule: WeeklySchedule;
  blockedSlots: BlockedSlot[];
  addons: AddOn[];
  rating: number;
  reviewCount: number;
  featured?: boolean;
}

export interface BookingAddOnSelection {
  addonId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  pricingType: PricingType;
  totalPrice: number;
}

export type BookingStatus = 'pending' | 'confirmed' | 'rejected' | 'cancelled' | 'completed';
export type PaymentMethod = 'online_chargily' | 'on_site' | 'baridimob';
export type PaymentStatus = 'paid' | 'pending' | 'on_arrival';

export interface Booking {
  id: string;
  bookingRef: string; // e.g. MKN-2026-8941
  spaceId: string;
  spaceTitle: string;
  spacePhoto: string;
  spaceCommune: AlgiersCommune;
  hostId: string;
  hostName: string;
  hostPhone: string;
  hostWhatsApp: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  date: string; // YYYY-MM-DD
  startHour: number; // e.g. 9
  endHour: number; // e.g. 13
  hoursCount: number;
  guestCount: number;
  activity: string;
  specialRequests?: string;
  addons: BookingAddOnSelection[];
  spacePriceTotal: number;
  addonsPriceTotal: number;
  serviceFee: number; // platform fee in DA
  totalAmount: number; // total in DA
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: BookingStatus;
  createdAt: string;
  rejectionReason?: string;
  hasReviewed?: boolean;
}

export interface Review {
  id: string;
  spaceId: string;
  clientId: string;
  clientName: string;
  clientAvatar: string;
  rating: number;
  comment: string;
  date: string;
  activity: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'client' | 'host' | 'admin';
  avatar: string;
  bio?: string;
  responseRate?: number;
  verifiedIdentity?: boolean;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  date: string;
  type: 'booking_request' | 'booking_confirmed' | 'booking_rejected' | 'booking_cancelled' | 'payment_received' | 'review_received';
  read: boolean;
  bookingId?: string;
}

export type LanguageCode = 'fr' | 'en';
