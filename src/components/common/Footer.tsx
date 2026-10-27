import React, { useState } from 'react';
import { Sparkles, ArrowUp, Github, Twitter, Linkedin, Check } from 'lucide-react';
import { sounds } from '../../utils/audio';

export const Footer: React.FC<{
  onExploreClick: () => void;
  onPricingClick: () => void;
  onAboutClick: () => void;
}> = ({ onExploreClick, onPricingClick, onAboutClick }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    sounds.playCheck();
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  const scrollToTop = () => {
    sounds.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 mt-20 border-t border-white/[0.08] bg-slate-950/70 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-md border border-white/20">
                <div className="w-3.5 h-3.5 border-2 border-slate-950 rounded-sm rotate-45 flex items-center justify-center">
                  <div className="w-1 h-1 bg-slate-950 rounded-full" />
                </div>
              </div>
              <span className="text-lg font-extrabold text-white tracking-tight">
                PathFinder <span className="text-gradient-gold">AI</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              The enterprise 3D AI-powered learning path generator that transforms your ambitions into structured,
              milestone-driven roadmaps with curated modules and real practice.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/aroramukti1477-svg/Pathfinder"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl glass-pill flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl glass-pill flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl glass-pill flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300">Platform</h5>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li>
                <button onClick={scrollToTop} className="hover:text-amber-400 transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={onExploreClick} className="hover:text-amber-400 transition-colors">
                  Explore Curated Roadmaps
                </button>
              </li>
              <li>
                <button onClick={onPricingClick} className="hover:text-amber-400 transition-colors">
                  Membership & Pricing
                </button>
              </li>
              <li>
                <button onClick={onAboutClick} className="hover:text-amber-400 transition-colors">
                  About & Architecture
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="md:col-span-4 space-y-3">
            <h5 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300">
              Curriculum Dispatch
            </h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Receive newly synthesized roadmaps, trending CS research, and interview problem sets.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@domain.com"
                className="glass-card px-3.5 py-2 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 w-full"
              />
              <button
                type="submit"
                className="btn-3d-amber px-4 py-2 rounded-xl text-xs font-bold text-slate-950 shrink-0 cursor-pointer"
              >
                {subscribed ? <Check className="w-4 h-4 text-slate-950" /> : <span>Join</span>}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            © {new Date().getFullYear()} PathFinder AI Inc. Enterprise 3D & Smoked Quartz Architecture.
          </div>
          <button
            onClick={scrollToTop}
            className="glass-pill px-3 py-1.5 rounded-xl font-bold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
