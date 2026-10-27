import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Volume2, VolumeX, Menu, X, Compass, User, LogOut, LayoutDashboard, Shield } from 'lucide-react';
import { sounds } from '../../utils/audio';

interface NavbarProps {
  onGetStartedClick: () => void;
  onExploreClick: () => void;
  onPricingClick: () => void;
  onAboutClick: () => void;
  onOpenAuth: () => void;
  currentUser: { id: string; name: string; email: string; skillLevel: string } | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onGetStartedClick,
  onExploreClick,
  onPricingClick,
  onAboutClick,
  onOpenAuth,
  currentUser,
  onLogout,
}) => {
  const [activeLink, setActiveLink] = useState('Home');
  const [isMuted, setIsMuted] = useState(sounds.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { label: 'Explore', action: onExploreClick },
    { label: 'Pricing', action: onPricingClick },
    { label: 'About', action: onAboutClick },
  ];

  const handleSoundToggle = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
    if (!muted) sounds.playClick();
  };

  const handleLinkClick = (link: typeof navLinks[0]) => {
    sounds.playClick();
    setActiveLink(link.label);
    setMobileMenuOpen(false);
    link.action();
  };

  return (
    <header className="sticky top-4 z-50 w-full px-4 sm:px-6">
      <nav className="max-w-7xl mx-auto glass-panel rounded-2xl px-5 py-3 flex items-center justify-between border border-white/[0.08] shadow-2xl backdrop-blur-2xl">
        {/* Left: Geometric Node / Book Emblem + Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative">
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 opacity-50 blur-sm group-hover:opacity-80 transition-opacity" />
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 p-0.5 shadow-md flex items-center justify-center border border-white/20 transform group-hover:rotate-6 transition-transform">
              {/* Geometric Node Emblem */}
              <div className="w-4 h-4 border-2 border-slate-950 rounded-sm rotate-45 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-slate-950 rounded-full" />
              </div>
            </div>
          </div>
          <div className="flex items-center text-lg font-extrabold tracking-tight">
            <span className="text-white">PathFinder</span>
            <span className="ml-1.5 px-1.5 py-0.5 rounded text-[11px] font-mono font-bold tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-sm">
              AI
            </span>
          </div>
        </div>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 glass-pill px-2.5 py-1 rounded-xl border border-white/[0.06]">
          {navLinks.map((link) => {
            const isActive = activeLink === link.label;
            return (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link)}
                className={`relative px-4 py-1.5 text-xs font-semibold transition-colors duration-200 rounded-lg ${
                  isActive ? 'text-amber-400' : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 bg-white/[0.08] rounded-lg -z-10 border border-white/[0.08]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Sound Toggle + Real Auth State */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            title={isMuted ? 'Unmute tactical audio' : 'Mute tactical audio'}
            className="w-8 h-8 rounded-xl glass-pill flex items-center justify-center text-slate-400 hover:text-amber-400 transition-colors"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
          </button>

          {/* Auth State */}
          {currentUser ? (
            /* Logged In: Profile Pill + My Dashboard + Logout */
            <div className="flex items-center gap-2">
              <div className="glass-pill px-3 py-1.5 rounded-xl border border-white/[0.08] flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] font-bold border border-amber-500/30">
                  {currentUser.name.charAt(0)}
                </div>
                <span className="text-xs font-semibold text-white max-w-[100px] truncate">
                  {currentUser.name}
                </span>
              </div>

              <button
                onClick={() => {
                  sounds.playClick();
                  onGetStartedClick();
                }}
                className="btn-smoked px-3 py-1.5 rounded-xl text-xs font-bold text-slate-200 hover:text-white flex items-center gap-1.5"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-amber-400" />
                <span>My Dashboard</span>
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  onLogout();
                }}
                title="Logout"
                className="w-8 h-8 rounded-xl glass-pill flex items-center justify-center text-slate-400 hover:text-rose-400 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            /* Logged Out: Sign In + Get Started */
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenAuth();
                }}
                className="btn-smoked px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white transition-colors"
              >
                Sign In
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  onGetStartedClick();
                }}
                className="btn-3d-amber px-4 py-1.5 rounded-xl text-slate-950 font-bold text-xs flex items-center gap-1.5 group cursor-pointer shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                <span>Get Started</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 sm:hidden">
          <button
            onClick={() => {
              sounds.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="w-9 h-9 rounded-xl glass-pill flex items-center justify-center text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="sm:hidden mt-2 max-w-7xl mx-auto glass-panel-deep rounded-2xl p-4 border border-white/[0.12]"
          >
            <div className="space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link)}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-white/[0.05] hover:text-white transition-colors"
                >
                  {link.label}
                </button>
              ))}

              <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-2">
                {currentUser ? (
                  <button
                    onClick={() => {
                      sounds.playClick();
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full btn-smoked py-2 rounded-xl text-xs font-bold text-rose-400 flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout ({currentUser.name})</span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        sounds.playClick();
                        setMobileMenuOpen(false);
                        onOpenAuth();
                      }}
                      className="w-full btn-smoked py-2 rounded-xl text-xs font-semibold text-white"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        sounds.playClick();
                        setMobileMenuOpen(false);
                        onGetStartedClick();
                      }}
                      className="w-full btn-3d-amber py-2.5 rounded-xl text-slate-950 font-bold text-xs flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Get Started</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
