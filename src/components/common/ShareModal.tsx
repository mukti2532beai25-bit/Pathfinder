import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Copy, Check, Share2, Sparkles, Award, ExternalLink } from 'lucide-react';
import { LearningPath } from '../../types';
import { sounds } from '../../utils/audio';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  path: LearningPath;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, path }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}?path=${encodeURIComponent(path.id)}` : '';

  const handleCopy = () => {
    sounds.playCheck();
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative z-10 w-full max-w-lg rounded-3xl glass-panel-deep p-6 sm:p-8 border border-white/90 shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400/40 flex items-center justify-center text-amber-950">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">Share Your Learning Path</h3>
              <p className="text-xs text-slate-500">Inspire your peers or keep yourself accountable</p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full glass-pill flex items-center justify-center text-slate-600 hover:text-slate-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Share Preview Card */}
        <div className="my-6 p-5 rounded-2xl bg-gradient-to-br from-amber-400/20 via-white/60 to-sky-400/20 border border-white/90 shadow-glass">
          <div className="flex items-center justify-between mb-2">
            <span className="glass-pill px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase text-amber-900">
              PathFinder AI Blueprint
            </span>
            <span className="text-xs font-bold text-slate-600">{path.level}</span>
          </div>
          <h4 className="text-lg font-extrabold text-slate-900">{path.title}</h4>
          <p className="text-xs text-slate-600 mt-1 line-clamp-2">{path.summary}</p>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-200/50 text-xs font-bold text-slate-700">
            <span>{path.milestones.length} Milestones</span>
            <span>{path.weeklyHours}h/week</span>
            <span>{path.totalWeeks} Weeks Total</span>
          </div>
        </div>

        {/* Link Copy Box */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
            Shareable Public Link:
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="w-full glass-card px-3.5 py-2.5 rounded-xl text-xs font-mono text-slate-800 border border-white/80 focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className="btn-3d-amber px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-800" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
