import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, User, Shield, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { sounds } from '../../utils/audio';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (token: string, user: { id: string; name: string; email: string; skillLevel: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [skillLevel, setSkillLevel] = useState('Beginner');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    sounds.playClick();

    const endpoint = tab === 'login' ? '/api/auth/login' : '/api/auth/signup';
    const body = tab === 'login' ? { email, password } : { name, email, password, skillLevel };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      sounds.playCheck();
      localStorage.setItem('pfai_token', data.token);
      localStorage.setItem('pfai_user', JSON.stringify(data.user));
      onAuthSuccess(data.token, data.user);
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFillDemo = () => {
    sounds.playClick();
    setTab('login');
    setEmail('demo@pathfinder.ai');
    setPassword('Password123!');
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative z-10 w-full max-w-md rounded-3xl glass-panel-deep p-6 sm:p-8 border border-white/[0.12] shadow-2xl overflow-hidden"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500/20 to-amber-400/10 flex items-center justify-center border border-amber-500/30 text-amber-400">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">
                {tab === 'login' ? 'Sign In to Pathfinder' : 'Create Free Account'}
              </h3>
              <p className="text-xs text-slate-400">Sync and preserve your learning progress</p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full glass-pill flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl glass-pill my-5 border border-white/[0.08]">
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              setTab('login');
              setError(null);
            }}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              tab === 'login'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              setTab('signup');
              setError(null);
            }}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              tab === 'signup'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center gap-2 text-xs text-rose-300">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'signup' && (
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full glass-card px-3.5 py-2.5 pl-10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                />
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          )}

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full glass-card px-3.5 py-2.5 pl-10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
              />
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full glass-card px-3.5 py-2.5 pl-10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {tab === 'signup' && (
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Current Skill Level
              </label>
              <select
                value={skillLevel}
                onChange={(e) => setSkillLevel(e.target.value)}
                className="w-full glass-card px-3.5 py-2.5 rounded-xl text-xs text-white bg-slate-900 border border-white/[0.08] focus:outline-none focus:border-amber-500/50"
              >
                <option value="Beginner">Beginner — Zero to little experience</option>
                <option value="Intermediate">Intermediate — 1-2 years coding experience</option>
                <option value="Advanced">Advanced — Senior/Lead engineering mastery</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-3d-amber py-3 rounded-xl font-bold text-xs text-slate-950 flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{loading ? 'Processing...' : tab === 'login' ? 'Sign In' : 'Create Free Account'}</span>
          </button>
        </form>

        {/* Quick Fill Demo Button */}
        <div className="mt-5 pt-4 border-t border-white/[0.08] text-center">
          <button
            type="button"
            onClick={handleQuickFillDemo}
            className="text-xs text-amber-400 hover:text-amber-300 font-semibold transition-colors flex items-center justify-center gap-1.5 mx-auto"
          >
            <span>⚡ Quick Fill Seeded Demo User</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
