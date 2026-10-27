import React from 'react';
import { motion } from 'framer-motion';
import { X, Compass, ArrowRight, Clock, Award, Star, Sparkles } from 'lucide-react';
import { PREBUILT_PATHS } from '../../data/mockPaths';
import { LearningPath } from '../../types';
import { sounds } from '../../utils/audio';

interface ExploreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPath: (path: LearningPath) => void;
}

export const ExploreModal: React.FC<ExploreModalProps> = ({ isOpen, onClose, onSelectPath }) => {
  if (!isOpen) return null;

  const paths = Object.values(PREBUILT_PATHS);

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
        className="relative z-10 w-full max-w-3xl rounded-3xl glass-panel-deep p-6 sm:p-8 border border-white/90 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400/40 flex items-center justify-center text-amber-950">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">Explore Curated Roadmaps</h3>
              <p className="text-xs text-slate-500">Pick any trajectory to load immediately into the 3D generator</p>
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

        {/* Catalog List */}
        <div className="overflow-y-auto py-4 space-y-3.5 pr-1">
          {paths.map((p) => (
            <div
              key={p.id}
              className="glass-panel p-5 rounded-2xl border border-white/80 hover:border-amber-400/60 transition-all shadow-glass flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="glass-pill px-2.5 py-0.5 rounded-full text-[10px] font-bold text-amber-900 border border-amber-300/60">
                    {p.badge}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">•</span>
                  <span className="text-xs font-bold text-slate-700">{p.level}</span>
                  <span className="text-xs font-semibold text-slate-500">•</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {p.totalWeeks} Weeks ({p.weeklyHours}h/wk)
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-amber-800 transition-colors">
                  {p.title}
                </h4>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {p.summary}
                </p>
              </div>

              <button
                onClick={() => {
                  sounds.playMagic();
                  onSelectPath(p);
                  onClose();
                }}
                className="btn-3d-amber px-5 py-2.5 rounded-xl text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <span>Load Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
