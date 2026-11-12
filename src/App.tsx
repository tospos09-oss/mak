import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HeroSection } from './components/home/HeroSection';
import { CategoryGrid } from './components/home/CategoryGrid';
import { FeaturedSpaces } from './components/home/FeaturedSpaces';
import { HowItWorksSection } from './components/home/HowItWorksSection';
import { TestimonialsSection } from './components/home/TestimonialsSection';
import { FaqSection } from './components/home/FaqSection';
import { LandingCtaBanner } from './components/home/LandingCtaBanner';
import { SearchResults } from './components/search/SearchResults';
import { SpaceDetail } from './components/space/SpaceDetail';
import { ClientBookingsView } from './components/booking/ClientBookingsView';
import { AuthModal } from './components/auth/AuthModal';
import { PublishSpaceModal } from './components/host/PublishSpaceModal';
import { HostLandingPage } from './components/host/HostLandingPage';

const AppContent: React.FC = () => {
  const { activePage, selectedSpaceId } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111111]">
      <Header />

      <main className="flex-1">
        {activePage === 'home' && (
          <>
            <HeroSection />
            <CategoryGrid />
            <FeaturedSpaces />
            <HowItWorksSection />
            <TestimonialsSection />
            <FaqSection />
            <LandingCtaBanner />
          </>
        )}

        {activePage === 'host' && <HostLandingPage />}

        {activePage === 'browse' && <SearchResults />}

        {activePage === 'space-detail' && selectedSpaceId && (
          <SpaceDetail spaceId={selectedSpaceId} />
        )}

        {activePage === 'bookings' && <ClientBookingsView />}
      </main>

      <Footer />
      <AuthModal />
      <PublishSpaceModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
