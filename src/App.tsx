import React, { useState, useEffect } from 'react';
import { BackgroundCanvas3D } from './components/3d/BackgroundCanvas3D';
import { Navbar } from './components/common/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { FeatureGrid } from './components/features/FeatureGrid';
import { PathGenerator, ActivePath } from './components/generator/PathGenerator';
import { AuthModal } from './components/common/AuthModal';
import { HowItWorksModal } from './components/common/HowItWorksModal';
import { ShareModal } from './components/common/ShareModal';
import { ExploreModal } from './components/common/ExploreModal';
import { PricingModal } from './components/common/PricingModal';
import { AboutModal } from './components/common/AboutModal';
import { Footer } from './components/common/Footer';
import { sounds } from './utils/audio';

export interface UserState {
  id: string;
  name: string;
  email: string;
  skillLevel: string;
}

export const App: React.FC = () => {
  // Auth state
  const [currentUser, setCurrentUser] = useState<UserState | null>(null);
  const [authOpen, setAuthOpen] = useState(false);

  // Modal states
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [sharePath, setSharePath] = useState<ActivePath | null>(null);
  const [selectedExplorePathId, setSelectedExplorePathId] = useState<string | null>(null);

  // Load and verify user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('pfai_user');
    const storedToken = localStorage.getItem('pfai_token');
    if (storedUser && storedToken) {
      try {
        setCurrentUser(JSON.parse(storedUser));
        // Verify with /api/auth/me
        fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
          .then((res) => {
            if (!res.ok) {
              localStorage.removeItem('pfai_token');
              localStorage.removeItem('pfai_user');
              setCurrentUser(null);
            }
          })
          .catch(() => {});
      } catch {
        // Ignore
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('pfai_token');
    localStorage.removeItem('pfai_user');
    setCurrentUser(null);
  };

  const handleAuthSuccess = (token: string, user: UserState) => {
    setCurrentUser(user);
  };

  const scrollToGenerator = () => {
    sounds.playClick();
    const el = document.getElementById('path-generator-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-amber-500 selection:text-slate-950 bg-[#030712] text-slate-100">
      {/* 3D Background Canvas: Ambient Nebular Orbs & Particles */}
      <BackgroundCanvas3D />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Floating Smoked-Glass Navbar */}
        <Navbar
          currentUser={currentUser}
          onLogout={handleLogout}
          onOpenAuth={() => setAuthOpen(true)}
          onGetStartedClick={scrollToGenerator}
          onExploreClick={() => {
            sounds.playClick();
            setExploreOpen(true);
          }}
          onPricingClick={() => {
            sounds.playClick();
            setPricingOpen(true);
          }}
          onAboutClick={() => {
            sounds.playClick();
            setAboutOpen(true);
          }}
        />

        {/* Hero Section (Split Layout with 3D Neural Scene & Telemetry Cards) */}
        <HeroSection
          onGenerateClick={scrollToGenerator}
          onSeeHowItWorksClick={() => {
            sounds.playClick();
            setHowItWorksOpen(true);
          }}
        />

        {/* Feature Grid (4 Smoked-Glass Spotlight Bento Cards) */}
        <FeatureGrid
          onFeatureClick={(id) => {
            if (id === 'f1' || id === 'f2' || id === 'f3') {
              scrollToGenerator();
            } else {
              setExploreOpen(true);
            }
          }}
        />

        {/* Core Feature: 3D Glass Learning Path Generator with Database Sync */}
        <PathGenerator
          currentUser={currentUser}
          onOpenAuth={() => setAuthOpen(true)}
          selectedPathId={selectedExplorePathId}
          onShareClick={(path) => {
            // Adapt to share format
            setSharePath(path);
          }}
        />

        {/* Smoked Quartz Footer */}
        <Footer
          onExploreClick={() => {
            sounds.playClick();
            setExploreOpen(true);
          }}
          onPricingClick={() => {
            sounds.playClick();
            setPricingOpen(true);
          }}
          onAboutClick={() => {
            sounds.playClick();
            setAboutOpen(true);
          }}
        />
      </div>

      {/* Interactive Modals */}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      <HowItWorksModal
        isOpen={howItWorksOpen}
        onClose={() => setHowItWorksOpen(false)}
        onStartGenerating={() => {
          setHowItWorksOpen(false);
          scrollToGenerator();
        }}
      />

      <ExploreModal
        isOpen={exploreOpen}
        onClose={() => setExploreOpen(false)}
        onSelectPath={(path) => {
          setSelectedExplorePathId(path.id);
          setExploreOpen(false);
          scrollToGenerator();
        }}
      />

      <PricingModal
        isOpen={pricingOpen}
        onClose={() => setPricingOpen(false)}
        onSelectPlan={() => {
          setPricingOpen(false);
          scrollToGenerator();
        }}
      />

      <AboutModal
        isOpen={aboutOpen}
        onClose={() => setAboutOpen(false)}
      />

      {sharePath && (
        <ShareModal
          isOpen={!!sharePath}
          onClose={() => setSharePath(null)}
          path={{
            id: sharePath.id,
            title: sharePath.goalTitle,
            targetGoal: sharePath.goalTitle,
            level: (sharePath.skillLevel as any) || 'Beginner',
            weeklyHours: sharePath.weeklyHours,
            totalWeeks: Math.max(6, Math.round(180 / sharePath.weeklyHours)),
            totalHours: 180,
            badge: `${sharePath.skillLevel} Architect`,
            color: 'from-amber-400 to-amber-600',
            summary: `Accelerated pathway tailored for ${sharePath.goalTitle}`,
            createdAt: sharePath.createdAt,
            milestones: [],
          }}
        />
      )}
    </div>
  );
};

export default App;
