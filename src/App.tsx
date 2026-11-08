import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HeroSection } from './components/home/HeroSection';
import { CategoryGrid } from './components/home/CategoryGrid';
import { FeaturedSpaces } from './components/home/FeaturedSpaces';
import { WhyMakanset } from './components/home/WhyMakanset';
import { CommunesSection } from './components/home/CommunesSection';
import { SearchResults } from './components/search/SearchResults';
import { SpaceDetail } from './components/space/SpaceDetail';
import { ClientBookingsView } from './components/booking/ClientBookingsView';

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
            <WhyMakanset />
            <CommunesSection />
          </>
        )}

        {activePage === 'browse' && <SearchResults />}

        {activePage === 'space-detail' && selectedSpaceId && (
          <SpaceDetail spaceId={selectedSpaceId} />
        )}

        {activePage === 'bookings' && <ClientBookingsView />}
      </main>

      <Footer />
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
