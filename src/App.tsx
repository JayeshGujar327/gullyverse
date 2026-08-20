import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { PlayerProvider } from './context/PlayerContext';
import { LayoutThemeProvider, useLayoutTheme } from './context/LayoutThemeContext';

import { SpotifyShell } from './components/spotify/SpotifyShell';
import { VerticalSidebar } from './components/layout/VerticalSidebar';
import { TopProBar } from './components/layout/TopProBar';
import { TopCommandMegaNav } from './components/layout/TopCommandMegaNav';
import { StreetCypherNav } from './components/layout/StreetCypherNav';
import { MagazineNav } from './components/layout/MagazineNav';
import { MobileNavDock } from './components/layout/MobileNavDock';
import { Footer } from './components/layout/Footer';
import { GlobalPlayer } from './components/music/GlobalPlayer';
import { YoutubePlayerModal } from './components/music/YoutubePlayerModal';
import { GlobalSearchModal } from './components/search/GlobalSearchModal';
import { UIThemeCustomizerModal } from './components/layout/UIThemeCustomizerModal';

import { HomePage } from './pages/HomePage';
import { ArtistsPage } from './pages/ArtistsPage';
import { ArtistDetailPage } from './pages/ArtistDetailPage';
import { SongsPage } from './pages/SongsPage';
import { SongDetailPage } from './pages/SongDetailPage';
import { RegionalMapPage } from './pages/RegionalMapPage';
import { LearnRapPage } from './pages/LearnRapPage';
import { HistoryPage } from './pages/HistoryPage';
import { CyphersBattlesPage } from './pages/CyphersBattlesPage';
import { ProducersPage } from './pages/ProducersPage';
import { CulturePage } from './pages/CulturePage';
import { ArtistDnaComparePage } from './pages/ArtistDnaComparePage';
import { HipHopJourneyPage } from './pages/HipHopJourneyPage';
import { QuizzesPage } from './pages/QuizzesPage';
import { PlaylistsPage } from './pages/PlaylistsPage';
import { SubmitArtistPage } from './pages/SubmitArtistPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AwardsPage } from './pages/AwardsPage';
import { AboutCreatorPage } from './pages/AboutCreatorPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainAppShell() {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { navStyle } = useLayoutTheme();

  // Primary App Routes
  const appRoutes = (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/artists" element={<ArtistsPage />} />
      <Route path="/artists/:id" element={<ArtistDetailPage />} />
      <Route path="/songs" element={<SongsPage />} />
      <Route path="/songs/:id" element={<SongDetailPage />} />
      <Route path="/map" element={<RegionalMapPage />} />
      <Route path="/learn-rap" element={<LearnRapPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/cyphers" element={<CyphersBattlesPage />} />
      <Route path="/producers" element={<ProducersPage />} />
      <Route path="/culture" element={<CulturePage />} />
      <Route path="/compare" element={<ArtistDnaComparePage />} />
      <Route path="/journey" element={<HipHopJourneyPage />} />
      <Route path="/quizzes" element={<QuizzesPage />} />
      <Route path="/playlists" element={<PlaylistsPage />} />
      <Route path="/submit" element={<SubmitArtistPage />} />
      <Route path="/admin" element={<AdminDashboardPage />} />
      <Route path="/about" element={<AboutCreatorPage />} />
      <Route path="/awards" element={<AwardsPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );

  // 1. FLAGSHIP SPOTIFY SHELL ARCHITECTURE
  if (navStyle === 'SPOTIFY_SHELL' || !navStyle) {
    return (
      <>
        <SpotifyShell onOpenSearch={() => setSearchModalOpen(true)}>
          {appRoutes}
        </SpotifyShell>

        {/* Global Modals */}
        <YoutubePlayerModal />
        <GlobalSearchModal
          isOpen={searchModalOpen}
          onClose={() => setSearchModalOpen(false)}
        />
        <UIThemeCustomizerModal />
      </>
    );
  }

  // 2. ALTERNATIVE SHELLS (If selected in customizer)
  return (
    <div className="min-h-screen bg-[#080a0f] text-slate-100 flex flex-col selection:bg-[#1ed760] selection:text-black relative">
      {navStyle === 'SIDEBAR' && (
        <VerticalSidebar 
          onOpenSearch={() => setSearchModalOpen(true)}
          mobileOpen={mobileNavOpen}
          onCloseMobile={() => setMobileNavOpen(false)}
        />
      )}

      {navStyle === 'TOP_COMMAND' && (
        <TopCommandMegaNav 
          onOpenSearch={() => setSearchModalOpen(true)}
          onOpenMobileNav={() => setMobileNavOpen(true)}
        />
      )}

      {navStyle === 'STREET_BAR' && (
        <StreetCypherNav 
          onOpenSearch={() => setSearchModalOpen(true)}
          onOpenMobileNav={() => setMobileNavOpen(true)}
        />
      )}

      {navStyle === 'MAGAZINE_HEADER' && (
        <MagazineNav 
          onOpenSearch={() => setSearchModalOpen(true)}
          onOpenMobileNav={() => setMobileNavOpen(true)}
        />
      )}

      {navStyle !== 'SIDEBAR' && (
        <VerticalSidebar 
          onOpenSearch={() => setSearchModalOpen(true)}
          mobileOpen={mobileNavOpen}
          onCloseMobile={() => setMobileNavOpen(false)}
        />
      )}

      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
        navStyle === 'SIDEBAR' ? 'lg:pl-64 xl:pl-72' : 'w-full'
      }`}>
        {navStyle === 'SIDEBAR' && (
          <TopProBar 
            onOpenMobileNav={() => setMobileNavOpen(true)}
            onOpenSearch={() => setSearchModalOpen(true)}
          />
        )}

        <main className="flex-1 pb-24 sm:pb-28">
          {appRoutes}
        </main>

        <Footer />
      </div>

      <GlobalPlayer />
      <MobileNavDock onOpenMobileNav={() => setMobileNavOpen(true)} />
      <YoutubePlayerModal />
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
      <UIThemeCustomizerModal />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <PlayerProvider>
          <LayoutThemeProvider>
            <Router>
              <ScrollToTop />
              <MainAppShell />
            </Router>
          </LayoutThemeProvider>
        </PlayerProvider>
      </AuthProvider>
    </ToastProvider>
  );
}


