import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Brain, Cpu, CheckCircle2, ArrowRight, ArrowLeft, Trophy, Target, Layers, Play } from 'lucide-react';
import { sounds } from '../../utils/audio';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartGenerating: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({
  isOpen,
  onClose,
  onStartGenerating,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      step: '01',
      title: 'Goal Decomposition & Skill Profiling',
      subtitle: 'Understanding where you are & where you want to go',
      description:
        'Our AI parses your target role, dream company, or technical ambition into a hierarchical competency tree, calibrating against your initial proficiency and available weekly hours.',
      icon: Target,
      gradient: 'from-amber-400 to-amber-500',
      iconColor: 'text-amber-950',
      details: [
        'Analyzes prerequisite knowledge vs target requirements',
        'Calculates real weekly study velocity (5h to 30h/wk)',
        'Calibrates difficulty level (Beginner, Intermediate, Advanced)',
      ],
    },
    {
      step: '02',
      title: 'Global Curriculum Search & Quality Scoring',
      subtitle: 'Curating the top 1% of learning materials',
      description:
        'Instead of generic course dumps, PathFinder AI scans verified university syllabi (MIT OCW, Stanford Online, Harvard CS50) and battle-tested industry guides to pick high-yield resources.',
      icon: Brain,
      gradient: 'from-sky-400 to-sky-500',
      iconColor: 'text-sky-950',
      details: [
        'Filters out outdated tutorials and superficial video content',
        'Pairs comprehensive deep-dives with quick refresher guides',
        'Includes official documentation and language specs',
      ],
    },
    {
      step: '03',
      title: 'Deliberate Practice & Real Deliverables',
      subtitle: 'Turning passive watching into active coding competence',
      description:
        'For every conceptual module, the generator pairs targeted coding exercises, LeetCode patterns, architectural designs, and tangible milestone capstones you can add to your GitHub portfolio.',
      icon: Layers,
      gradient: 'from-emerald-400 to-emerald-500',
      iconColor: 'text-emerald-950',
      details: [
        'Hands-on coding challenges with architectural hints',
        'Milestone deliverables (e.g. Distributed Rate Limiter, Banking Engine)',
        'Checkpoint readiness quizzes to test retention before advancing',
      ],
    },
    {
      step: '04',
      title: 'Adaptive Progression & Milestone Mastery',
      subtitle: 'Dynamic liquid progress tracking & momentum',
      description:
        'As you check off modules and complete coding problems, your 3D liquid neon progress bar fills dynamically, tracking real hours invested, milestone completions, and skill streaks.',
      icon: Trophy,
      gradient: 'from-amber-400 to-emerald-400',
      iconColor: 'text-slate-950',
      details: [
        'Dynamic 3D liquid progress bar updates in real time',
        'Confetti milestones and verifiable completion metrics',
        'Export to JSON, PDF, or shareable link with one click',
      ],
    },
  ];

  if (!isOpen) return null;

  const current = steps[currentStep];
  const Icon = current.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        className="relative z-10 w-full max-w-2xl rounded-3xl glass-panel-deep p-6 sm:p-8 border border-white/90 shadow-2xl overflow-hidden"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400/40 flex items-center justify-center text-amber-900">
              <Play className="w-4 h-4 fill-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">How PathFinder AI Works</h3>
              <p className="text-xs text-slate-500">The 4-phase adaptive learning pipeline</p>
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

        {/* Step Indicator Tabs */}
        <div className="grid grid-cols-4 gap-2 my-6">
          {steps.map((st, idx) => (
            <button
              key={st.step}
              onClick={() => {
                sounds.playClick();
                setCurrentStep(idx);
              }}
              className={`p-2 rounded-xl text-center transition-all border ${
                currentStep === idx
                  ? 'bg-amber-400/30 border-amber-400 font-bold text-slate-950 shadow-sm'
                  : 'glass-pill border-white/60 text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="text-[10px] uppercase font-bold tracking-wider">Step {st.step}</div>
              <div className="text-xs truncate font-semibold hidden sm:block">
                {st.title.split(' ')[0]}
              </div>
            </button>
          ))}
        </div>

        {/* Step Content Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.25 }}
            className="glass-panel p-6 rounded-2xl border border-white/80 shadow-glass mb-6"
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${current.gradient} flex items-center justify-center shadow-md border border-white/80 shrink-0`}
              >
                <Icon className={`w-7 h-7 ${current.iconColor}`} />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                  Step {current.step} • {current.subtitle}
                </span>
                <h4 className="text-xl font-extrabold text-slate-900 mt-0.5">
                  {current.title}
                </h4>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {current.description}
                </p>

                {/* Bullet Highlights */}
                <div className="mt-4 space-y-1.5">
                  {current.details.map((detail, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200/60">
          <button
            onClick={() => {
              sounds.playClick();
              setCurrentStep((prev) => Math.max(0, prev - 1));
            }}
            disabled={currentStep === 0}
            className="glass-pill px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={() => {
                sounds.playClick();
                setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1));
              }}
              className="btn-3d-amber px-5 py-2 rounded-xl text-slate-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                sounds.playMagic();
                onClose();
                onStartGenerating();
              }}
              className="btn-3d-amber px-6 py-2.5 rounded-xl text-slate-950 text-xs font-extrabold flex items-center gap-2 shadow-glow-amber cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start Your Free Roadmap</span>
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
