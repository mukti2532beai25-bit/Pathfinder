import React from 'react';
import { motion } from 'framer-motion';
import { X, Info, Heart, Code2, Globe2, Sparkles, BookOpen } from 'lucide-react';
import { sounds } from '../../utils/audio';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
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
        className="relative z-10 w-full max-w-xl rounded-3xl glass-panel-deep p-6 sm:p-8 border border-white/90 shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400/40 flex items-center justify-center text-amber-950">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">About PathFinder AI</h3>
              <p className="text-xs text-slate-500">Transforming goals into mastery</p>
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

        <div className="my-6 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>
            <strong className="text-slate-900 font-bold">PathFinder AI</strong> was created with a simple premise:
            most self-directed learners fail not because they lack dedication, but because modern learning
            is fragmented across thousands of disjointed tutorials, videos, and documentation.
          </p>
          <p>
            By combining a high-performance <strong>3D Glassmorphism Web Interface</strong> with structured pedagogical
            curation, PathFinder AI turns any ambitious goal into a step-by-step roadmap: complete with
            curated university modules, deliberate coding exercises, and real capstones.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="glass-card p-3 rounded-xl">
              <span className="text-[10px] font-bold uppercase text-amber-700 block">3D Canvas</span>
              <span className="font-extrabold text-slate-900 text-xs">Three.js + R3F</span>
            </div>
            <div className="glass-card p-3 rounded-xl">
              <span className="text-[10px] font-bold uppercase text-amber-700 block">Design System</span>
              <span className="font-extrabold text-slate-900 text-xs">Glassmorphism + Tailwind</span>
            </div>
            <div className="glass-card p-3 rounded-xl">
              <span className="text-[10px] font-bold uppercase text-amber-700 block">Animations</span>
              <span className="font-extrabold text-slate-900 text-xs">Framer Motion Spring</span>
            </div>
            <div className="glass-card p-3 rounded-xl">
              <span className="text-[10px] font-bold uppercase text-amber-700 block">Audio Engine</span>
              <span className="font-extrabold text-slate-900 text-xs">Web Audio Synthesizer</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
          <span>Crafted for high-agency learners</span>
          <span className="font-semibold text-slate-700">v1.0.0 Production</span>
        </div>
      </motion.div>
    </div>
  );
};
