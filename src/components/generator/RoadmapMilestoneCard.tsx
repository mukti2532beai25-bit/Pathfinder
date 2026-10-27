import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  Clock,
  BookOpen,
  Code2,
  ExternalLink,
  CheckCircle2,
  Circle,
  Trophy,
  ArrowRight,
  Layers,
  Sparkles,
} from 'lucide-react';
import { sounds } from '../../utils/audio';

export interface MilestoneItem {
  id: string;
  phaseId: string;
  title: string;
  category: 'COURSE' | 'EXERCISE' | 'NEXT_STEP';
  details: string;
  resourceUrl?: string | null;
  estimatedHours: number;
  isCompleted: boolean;
  completedAt?: string | null;
}

export interface PhaseItem {
  id: string;
  pathId: string;
  phaseOrder: number;
  title: string;
  duration: string;
  summary: string;
  milestones?: MilestoneItem[];
}

interface RoadmapMilestoneCardProps {
  phase: PhaseItem;
  isLast: boolean;
  onToggleMilestone: (milestoneId: string) => void;
}

export const RoadmapMilestoneCard: React.FC<RoadmapMilestoneCardProps> = ({
  phase,
  isLast,
  onToggleMilestone,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const milestones = phase.milestones || [];
  const totalItems = milestones.length;
  const completedItems = milestones.filter((m) => m.isCompleted).length;
  const isPhaseFullyComplete = totalItems > 0 && completedItems === totalItems;
  const percentComplete = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const categoryBadges: Record<string, { label: string; color: string; border: string }> = {
    COURSE: { label: 'Course Module', color: 'text-amber-400 bg-amber-500/10', border: 'border-amber-500/30' },
    EXERCISE: { label: 'Code Lab', color: 'text-cyan-400 bg-cyan-500/10', border: 'border-cyan-500/30' },
    NEXT_STEP: { label: 'Deliverable Capstone', color: 'text-emerald-400 bg-emerald-500/10', border: 'border-emerald-500/30' },
  };

  return (
    <div className="relative flex items-start gap-4 sm:gap-6">
      {/* Left Timeline Column */}
      <div className="flex flex-col items-center shrink-0">
        {/* Node Badge */}
        <div
          onClick={() => {
            sounds.playClick();
            setIsExpanded(!isExpanded);
          }}
          className={`relative z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-mono font-bold text-sm sm:text-base border transition-all duration-300 cursor-pointer ${
            isPhaseFullyComplete
              ? 'bg-gradient-to-tr from-emerald-500 to-emerald-600 text-slate-950 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.35)]'
              : 'glass-panel text-amber-400 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
          }`}
        >
          {isPhaseFullyComplete ? (
            <CheckCircle2 className="w-5 h-5 text-slate-950" />
          ) : (
            <span>0{phase.phaseOrder}</span>
          )}
        </div>

        {/* Vertical Glowing Connector */}
        {!isLast && (
          <div className="w-0.5 flex-1 min-h-[90px] my-2 bg-gradient-to-b from-amber-500/40 via-cyan-500/30 to-amber-500/40 relative overflow-hidden" />
        )}
      </div>

      {/* Right Column: Smoked Glass Phase Card */}
      <div className="flex-1 pb-10">
        <div
          className={`rounded-2xl border transition-all duration-300 shadow-2xl ${
            isPhaseFullyComplete
              ? 'glass-panel border-emerald-500/30 bg-emerald-950/10'
              : 'glass-panel border-white/[0.08]'
          }`}
        >
          {/* Header */}
          <div
            onClick={() => {
              sounds.playClick();
              setIsExpanded(!isExpanded);
            }}
            className="p-5 sm:p-6 cursor-pointer select-none flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06]"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="glass-pill px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold text-amber-400 border border-amber-500/30 uppercase tracking-widest">
                  PHASE 0{phase.phaseOrder}
                </span>
                <span className="glass-pill px-2.5 py-0.5 rounded-full text-xs font-mono font-medium text-slate-400 flex items-center gap-1 border border-white/[0.06]">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {phase.duration}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {phase.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed max-w-2xl">
                {phase.summary}
              </p>
            </div>

            {/* Right Status */}
            <div className="flex items-center gap-4 self-end md:self-auto shrink-0">
              <div className="text-right">
                <div className="text-xs font-mono font-bold text-slate-300">
                  {completedItems}/{totalItems} Completed
                </div>
                <div className="w-24 sm:w-28 h-1.5 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isPhaseFullyComplete ? 'bg-emerald-400 shadow-[0_0_8px_#10B981]' : 'bg-amber-400'
                    }`}
                    style={{ width: `${percentComplete}%` }}
                  />
                </div>
              </div>

              <div className="w-8 h-8 rounded-xl glass-pill flex items-center justify-center text-slate-400">
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>
          </div>

          {/* Expandable Body */}
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="p-5 sm:p-6 space-y-3">
                  {milestones.map((ms) => {
                    const badge = categoryBadges[ms.category] || categoryBadges.COURSE;
                    return (
                      <div
                        key={ms.id}
                        className={`p-4 rounded-xl border transition-all duration-200 flex items-start justify-between gap-3 ${
                          ms.isCompleted
                            ? 'bg-emerald-950/20 border-emerald-500/30'
                            : 'glass-card border-white/[0.06] hover:border-white/[0.12]'
                        }`}
                      >
                        {/* Checkbox + Details */}
                        <div className="flex items-start gap-3.5 min-w-0">
                          <button
                            type="button"
                            onClick={() => {
                              sounds.playCheck();
                              onToggleMilestone(ms.id);
                            }}
                            className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border transition-all ${
                              ms.isCompleted
                                ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-[0_0_10px_rgba(16,185,129,0.4)]'
                                : 'border-slate-600 bg-slate-900/60 hover:border-amber-400 text-transparent'
                            }`}
                          >
                            <CheckCircle2 className="w-4 h-4 fill-current" />
                          </button>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span
                                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${badge.color} ${badge.border}`}
                              >
                                {badge.label}
                              </span>
                              <span className="text-xs font-mono text-slate-500">
                                ~{ms.estimatedHours} hrs
                              </span>
                            </div>

                            <p
                              className={`text-sm font-bold ${
                                ms.isCompleted ? 'line-through text-slate-500' : 'text-slate-100'
                              }`}
                            >
                              {ms.title}
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                              {ms.details}
                            </p>
                          </div>
                        </div>

                        {/* Resource URL button */}
                        {ms.resourceUrl && (
                          <a
                            href={ms.resourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg glass-pill text-slate-400 hover:text-white hover:border-white/[0.2] transition-colors shrink-0"
                            title="Open resource in new tab"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
