import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import QuickSearchModal from './components/QuickSearchModal';
import TutorialDetailModal from './components/TutorialDetailModal';
import DeveloperModal from './components/DeveloperModal';
import HomePage from './pages/HomePage';
import ScannerPage from './pages/ScannerPage';
import CommunityPage from './pages/CommunityPage';
import MapPage from './pages/MapPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [theme, setTheme] = useState('light'); // 'light' (Clean & Balanced Editorial) | 'dark' (Cyber Obsidian)
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDeveloperModalOpen, setIsDeveloperModalOpen] = useState(false);
  const [selectedItemForScanner, setSelectedItemForScanner] = useState(null);
  const [previewTutorial, setPreviewTutorial] = useState(null);
  const [upvotedState, setUpvotedState] = useState({});

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  // Shared User Profile & Gamification State
  const [userProfile, setUserProfile] = useState({
    name: "Alex Sterling",
    handle: "@alex_reclaims",
    role: "Circular Materials Architect",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
    credits: 840,
    itemsSorted: 142,
    wasteDivertedKg: 58.4,
    co2SavedKg: 192.6,
    blueprintsCreated: 3,
    upvotesReceived: 56,
    joinedDate: "FEB 2026",
    district: "Sector 07 // Urban Eco-Corridor"
  });

  const handleAddCredits = (points) => {
    setUserProfile(prev => {
      const oldCredits = prev.credits;
      const newCredits = oldCredits + points;

      // Check if unlocked a milestone
      const milestones = [250, 750, 1500];
      const crossed = milestones.find(m => oldCredits < m && newCredits >= m);

      if (crossed) {
        try {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#CCFF00', '#2563EB', '#0B0B0B']
          });
        } catch (err) {}
      }

      return {
        ...prev,
        credits: newCredits,
        itemsSorted: points === 50 ? prev.itemsSorted + 1 : prev.itemsSorted,
        wasteDivertedKg: Number((prev.wasteDivertedKg + (points * 0.05)).toFixed(1)),
        co2SavedKg: Number((prev.co2SavedKg + (points * 0.12)).toFixed(1))
      };
    });
  };

  const handleResetCredits = () => {
    setUserProfile(prev => ({
      ...prev,
      credits: 200 // Resets to Seedling Scout
    }));
  };

  const navigateTo = (pageId, payload = null) => {
    if (pageId === 'credits') {
      setIsDeveloperModalOpen(true);
      return;
    }
    if (payload && pageId === 'scanner') {
      setSelectedItemForScanner(payload);
    }
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTutorialFromHome = (tutorial) => {
    setPreviewTutorial(tutorial);
  };

  const toggleUpvoteInApp = (id) => {
    setUpvotedState(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSearchSelect = (item) => {
    if (item) {
      setSelectedItemForScanner(item);
      setCurrentPage('scanner');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-lime selection:text-obsidian-950 transition-colors duration-300 w-full max-w-full overflow-x-hidden ${
      theme === 'dark' ? 'cyber-dark-theme bg-obsidian-950 text-white' : 'bg-canvas text-obsidian-950'
    }`}>
      {/* Luxury Editorial Agency Custom Mouse Follower */}
      <CustomCursor />

      {/* Persistent Ultra-Modern Navigation with User Badge & Theme Toggle */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={navigateTo}
        onOpenSearch={() => setIsSearchOpen(true)}
        userProfile={userProfile}
        onOpenCredits={() => setIsDeveloperModalOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Multi-Page Screen Switcher */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onOpenTutorial={handleOpenTutorialFromHome}
            onOpenCredits={() => setIsDeveloperModalOpen(true)}
          />
        )}

        {currentPage === 'scanner' && (
          <ScannerPage
            onNavigate={navigateTo}
            initialSelectedItem={selectedItemForScanner}
            onRewardPoints={handleAddCredits}
          />
        )}

        {currentPage === 'community' && (
          <CommunityPage
            onOpenTutorial={handleOpenTutorialFromHome}
            onRewardPoints={handleAddCredits}
          />
        )}

        {currentPage === 'map' && (
          <MapPage
            onNavigate={navigateTo}
            onRewardPoints={handleAddCredits}
          />
        )}

        {currentPage === 'profile' && (
          <ProfilePage
            userProfile={userProfile}
            onUpdateProfile={setUserProfile}
            onAddCredits={handleAddCredits}
            onResetCredits={handleResetCredits}
            onNavigate={navigateTo}
          />
        )}
      </main>

      {/* Editorial Brutalist Footer with Wireframe Tunnel & Coordinates */}
      <Footer onNavigate={navigateTo} onOpenCredits={() => setIsDeveloperModalOpen(true)} />

      {/* Global Quick Search Modal (Cmd+K) */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectItem={handleSearchSelect}
      />

      {/* Modal for featured tutorial clicks from Home page */}
      <TutorialDetailModal
        tutorial={previewTutorial}
        isOpen={!!previewTutorial}
        onClose={() => setPreviewTutorial(null)}
        onToggleUpvote={toggleUpvoteInApp}
        isUpvoted={previewTutorial ? !!upvotedState[previewTutorial.id] : false}
      />

      {/* Dedicated Creator & Developer Dossier Modal */}
      <DeveloperModal
        isOpen={isDeveloperModalOpen}
        onClose={() => setIsDeveloperModalOpen(false)}
      />
    </div>
  );
}
