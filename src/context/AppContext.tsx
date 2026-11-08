import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Space,
  Booking,
  Review,
  UserProfile,
  NotificationItem,
  ActivityCategory,
  AlgiersCommune,
  LanguageCode,
  AddOn,
  BlockedSlot,
} from '../types';
import {
  INITIAL_SPACES,
  INITIAL_BOOKINGS,
  INITIAL_REVIEWS,
  INITIAL_NOTIFICATIONS,
  MOCK_USERS,
} from '../data/mockData';
import { translations, Translations } from '../i18n/translations';

interface SearchFilters {
  activity: ActivityCategory | 'all';
  commune: AlgiersCommune | 'all';
  date: string;
  startHour: number;
  endHour: number;
  guests: number;
  minPrice: number;
  maxPrice: number;
}

interface AppContextType {
  // Navigation & Page State
  activePage: 'home' | 'browse' | 'space-detail' | 'bookings';
  selectedSpaceId: string | null;
  navigateTo: (page: 'home' | 'browse' | 'space-detail' | 'bookings', spaceId?: string) => void;

  // Language & i18n
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: Translations;

  // User & Roles
  currentUser: UserProfile;
  activeRole: 'client' | 'host' | 'admin';
  switchRole: (role: 'client' | 'host' | 'admin') => void;

  // Search & Filters
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  resetFilters: () => void;
  filteredSpaces: Space[];

  // Spaces Management
  spaces: Space[];
  getSpaceById: (id: string) => Space | undefined;
  addSpace: (newSpace: Omit<Space, 'id' | 'rating' | 'reviewCount'>) => void;
  updateSpace: (id: string, updates: Partial<Space>) => void;
  updateSpacePrice: (id: string, pricePerHour: number, dayPrice?: number) => void;
  toggleSpaceStatus: (id: string, status: Space['status']) => void;
  blockTimeSlot: (slot: Omit<BlockedSlot, 'id'>) => void;
  unblockTimeSlot: (slotId: string) => void;
  
  // Addons Management
  addAddOnToSpace: (spaceId: string, addon: Omit<AddOn, 'id' | 'spaceId'>) => void;
  updateAddOn: (spaceId: string, addonId: string, updates: Partial<AddOn>) => void;
  deleteAddOn: (spaceId: string, addonId: string) => void;
  duplicateAddOn: (sourceSpaceId: string, addonId: string, targetSpaceId: string) => void;

  // Bookings Management
  bookings: Booking[];
  clientBookings: Booking[];
  hostBookings: Booking[];
  createBooking: (bookingData: Omit<Booking, 'id' | 'bookingRef' | 'createdAt' | 'status'>) => Promise<Booking>;
  confirmBooking: (bookingId: string) => void;
  rejectBooking: (bookingId: string, reason?: string) => void;
  cancelBooking: (bookingId: string) => void;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;

  // Favorites
  favorites: string[];
  toggleFavorite: (spaceId: string) => void;
  isFavorite: (spaceId: string) => boolean;

  // Notifications
  notifications: NotificationItem[];
  unreadNotificationsCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;

  // Admin Config
  platformCommissionRate: number;
  setPlatformCommissionRate: (rate: number) => void;
}

const defaultFilters: SearchFilters = {
  activity: 'all',
  commune: 'all',
  date: '',
  startHour: 9,
  endHour: 13,
  guests: 1,
  minPrice: 0,
  maxPrice: 30000,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Page Navigation
  const [activePage, setActivePage] = useState<'home' | 'browse' | 'space-detail' | 'bookings'>('home');
  const [selectedSpaceId, setSelectedSpaceId] = useState<string | null>(null);

  // Language & RTL
  const [language, setLanguageState] = useState<LanguageCode>('fr');

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = translations[language];

  // User & Roles
  const [activeRole, setActiveRole] = useState<'client' | 'host' | 'admin'>('client');
  const [currentUser, setCurrentUser] = useState<UserProfile>(MOCK_USERS[3]); // default Karim (client)

  const switchRole = (role: 'client' | 'host' | 'admin') => {
    setActiveRole(role);
    if (role === 'host') {
      setCurrentUser(MOCK_USERS[0]); // Amine Mansouri
    } else if (role === 'admin') {
      setCurrentUser(MOCK_USERS[4]); // Admin
    } else {
      setCurrentUser(MOCK_USERS[3]); // Karim Belkacem (client)
    }
  };

  // State entities
  const [spaces, setSpaces] = useState<Space[]>(() => {
    const saved = localStorage.getItem('makanset_spaces');
    return saved ? JSON.parse(saved) : INITIAL_SPACES;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('makanset_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('makanset_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('makanset_favorites');
    return saved ? JSON.parse(saved) : ['sp_1', 'sp_2'];
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('makanset_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [platformCommissionRate, setPlatformCommissionRate] = useState<number>(7);

  // Search Filters
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('makanset_spaces', JSON.stringify(spaces));
  }, [spaces]);

  useEffect(() => {
    localStorage.setItem('makanset_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('makanset_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('makanset_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Navigation Helper
  const navigateTo = (page: 'home' | 'browse' | 'space-detail' | 'bookings', spaceId?: string) => {
    setActivePage(page);
    if (spaceId !== undefined) {
      setSelectedSpaceId(spaceId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Space filtering logic
  const filteredSpaces = spaces.filter((space) => {
    if (activeRole !== 'admin' && space.status !== 'published') return false;

    // Filter by activity
    if (filters.activity !== 'all') {
      if (
        space.primaryCategory !== filters.activity &&
        !space.allowedActivities.includes(filters.activity)
      ) {
        return false;
      }
    }

    // Filter by commune
    if (filters.commune !== 'all' && space.commune !== filters.commune) {
      return false;
    }

    // Filter by capacity
    if (filters.guests > 1 && space.capacity < filters.guests) {
      return false;
    }

    // Filter by price
    if (filters.maxPrice > 0 && space.pricing.pricePerHour > filters.maxPrice) {
      return false;
    }

    // Filter by date & time slot availability
    if (filters.date) {
      // Check if space has blocked slot on that date
      const isBlocked = space.blockedSlots?.some((b) => {
        if (b.date === filters.date) {
          if (b.wholeDay) return true;
          if (b.startHour !== undefined && b.endHour !== undefined) {
            return (
              (filters.startHour >= b.startHour && filters.startHour < b.endHour) ||
              (filters.endHour > b.startHour && filters.endHour <= b.endHour) ||
              (filters.startHour <= b.startHour && filters.endHour >= b.endHour)
            );
          }
        }
        return false;
      });

      if (isBlocked) return false;

      // Check if already booked on that date and time
      const isBooked = bookings.some((bk) => {
        if (
          bk.spaceId === space.id &&
          bk.date === filters.date &&
          (bk.status === 'confirmed' || bk.status === 'pending')
        ) {
          return (
            (filters.startHour >= bk.startHour && filters.startHour < bk.endHour) ||
            (filters.endHour > bk.startHour && filters.endHour <= bk.endHour) ||
            (filters.startHour <= bk.startHour && filters.endHour >= bk.endHour)
          );
        }
        return false;
      });

      if (isBooked) return false;
    }

    return true;
  });

  const getSpaceById = (id: string) => {
    return spaces.find((s) => s.id === id);
  };

  const addSpace = (newSpaceData: Omit<Space, 'id' | 'rating' | 'reviewCount'>) => {
    const newId = `sp_${Date.now()}`;
    const newSpace: Space = {
      ...newSpaceData,
      id: newId,
      rating: 5.0,
      reviewCount: 0,
    };
    setSpaces((prev) => [newSpace, ...prev]);
  };

  const updateSpace = (id: string, updates: Partial<Space>) => {
    setSpaces((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const updateSpacePrice = (id: string, pricePerHour: number, dayPrice?: number) => {
    setSpaces((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          return {
            ...s,
            pricing: {
              ...s.pricing,
              pricePerHour,
              dayPrice: dayPrice ?? s.pricing.dayPrice,
            },
          };
        }
        return s;
      })
    );
  };

  const toggleSpaceStatus = (id: string, status: Space['status']) => {
    setSpaces((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );
  };

  const blockTimeSlot = (slot: Omit<BlockedSlot, 'id'>) => {
    const newBlocked: BlockedSlot = {
      ...slot,
      id: `block_${Date.now()}`,
    };
    setSpaces((prev) =>
      prev.map((s) => {
        if (s.id === slot.spaceId) {
          return {
            ...s,
            blockedSlots: [...(s.blockedSlots || []), newBlocked],
          };
        }
        return s;
      })
    );
  };

  const unblockTimeSlot = (slotId: string) => {
    setSpaces((prev) =>
      prev.map((s) => ({
        ...s,
        blockedSlots: (s.blockedSlots || []).filter((b) => b.id !== slotId),
      }))
    );
  };

  // Addon Management
  const addAddOnToSpace = (spaceId: string, addonData: Omit<AddOn, 'id' | 'spaceId'>) => {
    const newAddon: AddOn = {
      ...addonData,
      id: `ad_${Date.now()}`,
      spaceId,
    };
    setSpaces((prev) =>
      prev.map((s) => {
        if (s.id === spaceId) {
          return {
            ...s,
            addons: [...(s.addons || []), newAddon],
          };
        }
        return s;
      })
    );
  };

  const updateAddOn = (spaceId: string, addonId: string, updates: Partial<AddOn>) => {
    setSpaces((prev) =>
      prev.map((s) => {
        if (s.id === spaceId) {
          return {
            ...s,
            addons: s.addons.map((a) => (a.id === addonId ? { ...a, ...updates } : a)),
          };
        }
        return s;
      })
    );
  };

  const deleteAddOn = (spaceId: string, addonId: string) => {
    setSpaces((prev) =>
      prev.map((s) => {
        if (s.id === spaceId) {
          return {
            ...s,
            addons: s.addons.filter((a) => a.id !== addonId),
          };
        }
        return s;
      })
    );
  };

  const duplicateAddOn = (sourceSpaceId: string, addonId: string, targetSpaceId: string) => {
    const sourceSpace = spaces.find((s) => s.id === sourceSpaceId);
    const addon = sourceSpace?.addons.find((a) => a.id === addonId);
    if (!addon) return;

    addAddOnToSpace(targetSpaceId, {
      name: `${addon.name} (Copie)`,
      description: addon.description,
      photo: addon.photo,
      price: addon.price,
      pricingType: addon.pricingType,
      maxQuantity: addon.maxQuantity,
      isActive: true,
    });
  };

  // Bookings management
  const clientBookings = bookings.filter((b) => b.clientId === currentUser.id);
  const hostBookings = bookings.filter((b) => {
    // If the active user owns the space
    const space = spaces.find((s) => s.id === b.spaceId);
    return space?.hostId === currentUser.id;
  });

  const createBooking = async (
    bookingData: Omit<Booking, 'id' | 'bookingRef' | 'createdAt' | 'status'>
  ): Promise<Booking> => {
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const newBooking: Booking = {
      ...bookingData,
      id: `bk_${Date.now()}`,
      bookingRef: `MKN-2026-${randNum}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };

    setBookings((prev) => [newBooking, ...prev]);

    // Send notification to host
    const space = spaces.find((s) => s.id === newBooking.spaceId);
    if (space) {
      const newNotif: NotificationItem = {
        id: `notif_${Date.now()}`,
        userId: space.hostId,
        title: 'Nouvelle demande de réservation !',
        message: `${newBooking.clientName} souhaite réserver "${space.title}" le ${newBooking.date} (${newBooking.startHour}h-${newBooking.endHour}h).`,
        date: 'À l’instant',
        type: 'booking_request',
        read: false,
        bookingId: newBooking.id,
      };
      setNotifications((prev) => [newNotif, ...prev]);
    }

    return newBooking;
  };

  const confirmBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return {
            ...b,
            status: 'confirmed',
            paymentStatus: b.paymentMethod === 'online_chargily' ? 'paid' : b.paymentStatus,
          };
        }
        return b;
      })
    );

    // Notify client
    const targetBooking = bookings.find((b) => b.id === bookingId);
    if (targetBooking) {
      const newNotif: NotificationItem = {
        id: `notif_${Date.now()}`,
        userId: targetBooking.clientId,
        title: 'Réservation confirmée !',
        message: `Votre réservation pour "${targetBooking.spaceTitle}" le ${targetBooking.date} a été confirmée par l'hôte.`,
        date: 'À l’instant',
        type: 'booking_confirmed',
        read: false,
        bookingId: bookingId,
      };
      setNotifications((prev) => [newNotif, ...prev]);
    }
  };

  const rejectBooking = (bookingId: string, reason?: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              status: 'rejected',
              rejectionReason: reason || 'Le propriétaire est indisponible sur ce créneau',
            }
          : b
      )
    );

    const targetBooking = bookings.find((b) => b.id === bookingId);
    if (targetBooking) {
      const newNotif: NotificationItem = {
        id: `notif_${Date.now()}`,
        userId: targetBooking.clientId,
        title: 'Réservation non retenue',
        message: `L'hôte a décliné votre demande pour "${targetBooking.spaceTitle}" : ${reason || 'Indisponible'}.`,
        date: 'À l’instant',
        type: 'booking_rejected',
        read: false,
        bookingId: bookingId,
      };
      setNotifications((prev) => [newNotif, ...prev]);
    }
  };

  const cancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' } : b))
    );
  };

  // Reviews
  const addReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev_${Date.now()}`,
      date: 'Novembre 2026',
    };
    setReviews((prev) => [newReview, ...prev]);

    // Recalculate space rating
    setSpaces((prev) =>
      prev.map((s) => {
        if (s.id === reviewData.spaceId) {
          const spaceReviews = [...reviews.filter((r) => r.spaceId === s.id), newReview];
          const avg = spaceReviews.reduce((acc, curr) => acc + curr.rating, 0) / spaceReviews.length;
          return {
            ...s,
            rating: Number(avg.toFixed(2)),
            reviewCount: spaceReviews.length,
          };
        }
        return s;
      })
    );

    // Mark booking as reviewed
    setBookings((prev) =>
      prev.map((b) =>
        b.spaceId === reviewData.spaceId && b.clientId === reviewData.clientId
          ? { ...b, hasReviewed: true }
          : b
      )
    );
  };

  // Favorites
  const toggleFavorite = (spaceId: string) => {
    setFavorites((prev) =>
      prev.includes(spaceId) ? prev.filter((id) => id !== spaceId) : [...prev, spaceId]
    );
  };

  const isFavorite = (spaceId: string) => favorites.includes(spaceId);

  // Notifications
  const unreadNotificationsCount = notifications.filter((n) => !n.read && n.userId === currentUser.id).length;

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => (n.userId === currentUser.id ? { ...n, read: true } : n))
    );
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        selectedSpaceId,
        navigateTo,
        language,
        setLanguage,
        t,
        currentUser,
        activeRole,
        switchRole,
        filters,
        setFilters,
        resetFilters,
        filteredSpaces,
        spaces,
        getSpaceById,
        addSpace,
        updateSpace,
        updateSpacePrice,
        toggleSpaceStatus,
        blockTimeSlot,
        unblockTimeSlot,
        addAddOnToSpace,
        updateAddOn,
        deleteAddOn,
        duplicateAddOn,
        bookings,
        clientBookings,
        hostBookings,
        createBooking,
        confirmBooking,
        rejectBooking,
        cancelBooking,
        reviews,
        addReview,
        favorites,
        toggleFavorite,
        isFavorite,
        notifications,
        unreadNotificationsCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        platformCommissionRate,
        setPlatformCommissionRate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
