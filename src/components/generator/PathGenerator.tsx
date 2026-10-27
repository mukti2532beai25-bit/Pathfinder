import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Search,
  Clock,
  Share2,
  Download,
  Printer,
  Zap,
  TrendingUp,
  Layers,
  Database,
  CheckCircle2,
} from 'lucide-react';
import { RoadmapMilestoneCard, PhaseItem } from './RoadmapMilestoneCard';
import { sounds } from '../../utils/audio';

export interface ActivePath {
  id: string;
  userId?: string | null;
  goalTitle: string;
  skillLevel: string;
  weeklyHours: number;
  learningStyle: string;
  overallProgress: number;
  createdAt: string;
  phases?: PhaseItem[];
}

interface PathGeneratorProps {
  currentUser: { id: string; name: string; email: string; skillLevel: string } | null;
  onOpenAuth: () => void;
  onShareClick: (path: ActivePath) => void;
  selectedPathId?: string | null;
}

export const PathGenerator: React.FC<PathGeneratorProps> = ({
  currentUser,
  onOpenAuth,
  onShareClick,
  selectedPathId,
}) => {
  // Input Controls
  const [targetGoal, setTargetGoal] = useState('Java & Data Structures & Algorithms Mastery');
  const [skillLevel, setSkillLevel] = useState('Beginner');
  const [weeklyHours, setWeeklyHours] = useState(15);
  const [learningStyle, setLearningStyle] = useState('Balanced');

  // Paths state
  const [pathsList, setPathsList] = useState<ActivePath[]>([]);
  const [currentPath, setCurrentPath] = useState<ActivePath | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);

  const dashboardRef = useRef<HTMLDivElement>(null);

  const presetTopics = [
    { label: 'Java & DSA Mastery', full: 'Java & Data Structures & Algorithms Mastery', level: 'Beginner', hours: 15 },
    { label: 'Full-Stack Web Dev', full: 'Modern Full-Stack Web Development', level: 'Intermediate', hours: 20 },
    { label: 'AI/ML Engineering', full: 'AI & Machine Learning Engineering Roadmap', level: 'Intermediate', hours: 18 },
    { label: 'System Design', full: 'High-Scale Distributed System Design', level: 'Advanced', hours: 12 },
  ];

  const generationSteps = [
    'Parsing target ontology & prerequisite competency tree...',
    'Scoring university syllabi across MIT OCW, Stanford & industry standards...',
    'Synthesizing deliberate coding labs & milestone capstones...',
    'Calibrating weekly schedule & persistent database schema...',
  ];

  // Fetch paths from database
  const loadPaths = async () => {
    try {
      const token = localStorage.getItem('pfai_token');
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/paths', { headers });
      if (res.ok) {
        const data: ActivePath[] = await res.json();
        setPathsList(data);
        if (data.length > 0 && !currentPath) {
          setCurrentPath(data[0]);
        }
      }
    } catch (e) {
      console.error('Error fetching paths:', e);
    }
  };

  useEffect(() => {
    loadPaths();
  }, [currentUser]);

  useEffect(() => {
    if (selectedPathId && pathsList.length > 0) {
      const match = pathsList.find((p) => p.id === selectedPathId);
      if (match) setCurrentPath(match);
    }
  }, [selectedPathId, pathsList]);

  // Confetti when 100% complete
  useEffect(() => {
    if (currentPath && currentPath.overallProgress === 100) {
      sounds.playMilestoneComplete();
      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#FBBF24', '#06B6D4', '#10B981', '#F8FAFC'],
      });
    }
  }, [currentPath?.overallProgress]);

  // Handle Milestone Toggle directly against Database API
  const handleToggleMilestone = async (milestoneId: string) => {
    try {
      const res = await fetch(`/api/milestones/${milestoneId}/toggle`, {
        method: 'PATCH',
      });
      if (res.ok) {
        const result = await res.json();
        // Update local state smoothly
        setCurrentPath((prev) => {
          if (!prev) return null;
          const updatedPhases = prev.phases?.map((phase) => ({
            ...phase,
            milestones: phase.milestones?.map((m) =>
              m.id === milestoneId ? { ...m, isCompleted: result.milestone.isCompleted } : m
            ),
          }));
          return {
            ...prev,
            overallProgress: result.overallProgress,
            phases: updatedPhases,
          };
        });
      }
    } catch (e) {
      console.error('Failed to toggle milestone:', e);
    }
  };

  // Generate new path via /api/paths/generate
  const handleGenerate = async () => {
    if (!targetGoal.trim()) return;
    sounds.playMagic();
    setIsGenerating(true);
    setGenerationStep(0);

    const stepTimer = setInterval(() => {
      setGenerationStep((s) => (s < generationSteps.length - 1 ? s + 1 : s));
    }, 500);

    try {
      const token = localStorage.getItem('pfai_token');
      const res = await fetch('/api/paths/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          goalTitle: targetGoal,
          skillLevel,
          weeklyHours,
          learningStyle,
          userId: currentUser?.id || null,
        }),
      });

      clearInterval(stepTimer);
      if (res.ok) {
        const newPath: ActivePath = await res.json();
        setCurrentPath(newPath);
        setPathsList((prev) => [newPath, ...prev]);
        sounds.playCheck();
      }
    } catch (err) {
      clearInterval(stepTimer);
      console.error('Error generating path:', err);
    } finally {
      setIsGenerating(false);
      if (dashboardRef.current) {
        dashboardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleExportJSON = () => {
    if (!currentPath) return;
    sounds.playClick();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(currentPath, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${currentPath.goalTitle.replace(/\s+/g, '-').toLowerCase()}-roadmap.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const totalMilestones = currentPath?.phases?.reduce((acc, p) => acc + (p.milestones?.length || 0), 0) || 0;
  const completedMilestones = currentPath?.phases?.reduce(
    (acc, p) => acc + (p.milestones?.filter((m) => m.isCompleted).length || 0),
    0
  ) || 0;

  return (
    <section id="path-generator-section" ref={dashboardRef} className="relative z-10 py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Outer Smoked Glass Container */}
      <div className="glass-panel-deep p-6 sm:p-10 rounded-3xl border border-white/[0.1] shadow-2xl relative overflow-hidden backdrop-blur-2xl">
        {/* Subtle Ambient Top Border Highlight */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-amber-500/60 via-amber-400 to-cyan-500/60" />

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 glass-pill px-3.5 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300 mb-3 border border-amber-500/20">
            <Database className="w-3.5 h-3.5 text-amber-400" />
            <span>Database-Synchronized Pathway Generator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Synthesize Your Custom Learning Trajectory
          </h2>
          <p className="mt-2 text-slate-400 text-xs sm:text-sm">
            Select a target engineering discipline or customize your focus. Progress synchronizes
            instantly to your verified database account.
          </p>
        </div>

        {/* INPUT CONTROLS PANEL */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/[0.08] shadow-xl mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            {/* Input 1: Target Goal */}
            <div className="lg:col-span-5">
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                01 // Target Goal or Skill
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={targetGoal}
                  onChange={(e) => setTargetGoal(e.target.value)}
                  placeholder="e.g. Distributed Systems, Java & DSA, Rust..."
                  className="w-full glass-card px-4 py-3 pl-11 rounded-xl text-white font-semibold placeholder-slate-500 focus:outline-none focus:border-amber-500/50 text-sm"
                />
                <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Preset Pill Tags */}
              <div className="flex flex-wrap items-center gap-1.5 mt-3">
                <span className="text-[10px] font-mono text-slate-500 mr-1">Presets:</span>
                {presetTopics.map((tp) => (
                  <button
                    key={tp.label}
                    onClick={() => {
                      sounds.playClick();
                      setTargetGoal(tp.full);
                      setSkillLevel(tp.level);
                      setWeeklyHours(tp.hours);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all border ${
                      targetGoal === tp.full
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                        : 'glass-pill text-slate-400 hover:text-white border-white/[0.06]'
                    }`}
                  >
                    {tp.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 2: Skill Level Segmented Toggle */}
            <div className="lg:col-span-4">
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                02 // Proficiency Level
              </label>
              <div className="glass-pill p-1 rounded-xl flex items-center justify-between border border-white/[0.08]">
                {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => {
                  const isActive = skillLevel === lvl;
                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => {
                        sounds.playClick();
                        setSkillLevel(lvl);
                      }}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                        isActive
                          ? 'bg-white/[0.1] text-amber-300 border border-white/[0.1] shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {lvl}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input 3: Weekly Commitment Slider */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300">
                  03 // Weekly Hours
                </label>
                <span className="text-xs font-mono font-extrabold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  {weeklyHours} hrs/wk
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                <span>5h (Casual)</span>
                <span>15h (Balanced)</span>
                <span>30h (Sprint)</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-6 pt-5 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400 flex items-center gap-2 font-mono">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>
                Calculated duration:{' '}
                <strong className="text-white">
                  {Math.max(6, Math.round(180 / weeklyHours))} weeks
                </strong>{' '}
                (~180 hours total)
              </span>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full sm:w-auto btn-3d-amber px-8 py-3 rounded-xl text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isGenerating ? 'Synthesizing Roadmap...' : '✨ Generate Your Path'}</span>
            </button>
          </div>
        </div>

        {/* AI GENERATION ANIMATION OVERLAY */}
        <AnimatePresence>
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="my-8 p-8 rounded-2xl glass-panel-deep border border-amber-500/40 text-center shadow-2xl relative overflow-hidden"
            >
              <div className="max-w-md mx-auto">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 mx-auto flex items-center justify-center text-amber-400 mb-4 animate-pulse">
                  <Sparkles className="w-7 h-7 animate-spin" />
                </div>
                <h3 className="text-lg font-extrabold text-white mb-1.5">
                  Synthesizing Verified Learning Pathway
                </h3>
                <p className="text-xs font-mono text-amber-300 h-5">
                  {generationSteps[generationStep]}
                </p>

                <div className="flex items-center justify-center gap-2 mt-5">
                  {generationSteps.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i <= generationStep ? 'w-8 bg-amber-400' : 'w-2 bg-slate-800'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ROADMAP DASHBOARD OUTPUT */}
        {!isGenerating && currentPath && (
          <div className="space-y-8">
            {/* Top Dashboard Header & Metrics */}
            <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/[0.08] shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="glass-pill px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold text-amber-400 border border-amber-500/30 flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      <span>{currentPath.skillLevel.toUpperCase()} ROADMAP</span>
                    </span>
                    <span className="glass-pill px-2.5 py-0.5 rounded-full text-xs font-mono text-slate-400 border border-white/[0.06]">
                      Velocity: <strong className="text-white">{currentPath.weeklyHours}h/wk</strong>
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {currentPath.goalTitle}
                  </h3>
                </div>

                {/* Toolbar */}
                <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
                  <button
                    onClick={() => {
                      sounds.playClick();
                      onShareClick(currentPath);
                    }}
                    className="btn-smoked px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5"
                    title="Share Roadmap"
                  >
                    <Share2 className="w-4 h-4 text-amber-400" />
                    <span>Share</span>
                  </button>

                  <button
                    onClick={handleExportJSON}
                    className="btn-smoked px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5"
                    title="Export JSON"
                  >
                    <Download className="w-4 h-4 text-cyan-400" />
                    <span>Export JSON</span>
                  </button>

                  <button
                    onClick={() => {
                      sounds.playClick();
                      window.print();
                    }}
                    className="btn-smoked px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5"
                    title="Print"
                  >
                    <Printer className="w-4 h-4 text-slate-400" />
                    <span>Print</span>
                  </button>
                </div>
              </div>

              {/* 3D LIQUID NEON PROGRESS BAR */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-amber-400" />
                    <span>Overall Progress Metric</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 font-normal">
                      {completedMilestones} of {totalMilestones} verified tasks completed
                    </span>
                    <span className="text-xs font-mono font-extrabold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {currentPath.overallProgress}%
                    </span>
                  </div>
                </div>

                {/* Progress Track */}
                <div className="w-full h-3.5 bg-slate-900 rounded-full p-0.5 border border-white/[0.08] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${currentPath.overallProgress}%` }}
                    transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                    className="h-full rounded-full liquid-progress"
                  />
                </div>
              </div>

              {/* Guest Sync Banner if not logged in */}
              {!currentUser && (
                <div className="mt-5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <span className="text-amber-200">
                    💡 You are viewing as Guest. Sign in to sync this roadmap directly into your database profile!
                  </span>
                  <button
                    onClick={() => {
                      sounds.playClick();
                      onOpenAuth();
                    }}
                    className="btn-3d-amber px-3 py-1 rounded-lg text-slate-950 font-bold text-xs shrink-0 cursor-pointer"
                  >
                    Sign In / Sync
                  </button>
                </div>
              )}
            </div>

            {/* CONNECTED ROADMAP PHASES */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-amber-400" />
                  <span>Sequential Skill Phases & Conduits</span>
                </h4>
                <span className="text-xs font-mono text-slate-500">
                  Real-time database sync active
                </span>
              </div>

              <div className="space-y-2">
                {currentPath.phases?.map((phase, idx) => (
                  <RoadmapMilestoneCard
                    key={phase.id}
                    phase={phase}
                    isLast={idx === (currentPath.phases?.length || 0) - 1}
                    onToggleMilestone={handleToggleMilestone}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
