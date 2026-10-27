import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Play, Star, Users, ArrowRight, ShieldCheck } from 'lucide-react';
import { Hero3DScene } from '../3d/Hero3DScene';
import { sounds } from '../../utils/audio';

interface HeroSectionProps {
  onGenerateClick: () => void;
  onSeeHowItWorksClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onGenerateClick,
  onSeeHowItWorksClick,
}) => {
  return (
    <section className="relative z-10 pt-8 pb-16 lg:pt-14 lg:pb-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left Column: Enterprise Glass Content Panel */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-6 flex flex-col justify-center"
        >
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 glass-pill px-3.5 py-1.5 rounded-full mb-6 w-fit border border-amber-500/20 shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Next-Gen Enterprise Skill Synthesizer</span>
            </span>
          </div>

          {/* Main Heading: Bold 3-line typography */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6">
            <span className="block text-[#F8FAFC]">AI-Powered</span>
            <span className="block text-gradient-gold">Learning Path</span>
            <span className="block text-[#F8FAFC]">Generator</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-slate-400 font-normal leading-relaxed mb-8 max-w-xl">
            Build a personalised roadmap of courses, exercises, and next steps based on your goals,
            interests, and current skills.
          </p>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
            {/* Primary CTA: Glowing Amber Button */}
            <button
              onClick={() => {
                sounds.playMagic();
                onGenerateClick();
              }}
              className="btn-3d-amber px-7 py-3.5 rounded-xl text-slate-950 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg cursor-pointer group"
            >
              <Sparkles className="w-4 h-4 text-slate-950 group-hover:rotate-12 transition-transform" />
              <span>✨ Generate Your Path</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary CTA: Smoked Glass Pill Button */}
            <button
              onClick={() => {
                sounds.playClick();
                onSeeHowItWorksClick();
              }}
              className="btn-smoked px-6 py-3.5 rounded-xl font-bold text-slate-200 text-sm sm:text-base flex items-center justify-center gap-2.5 hover:text-white transition-all cursor-pointer group"
            >
              <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
                <Play className="w-3 h-3 text-amber-400 fill-amber-400" />
              </div>
              <span>See How It Works</span>
            </button>
          </div>

          {/* Social Proof & Trust Badges */}
          <div className="glass-panel p-4 rounded-2xl border border-white/[0.08] flex flex-wrap items-center justify-between gap-4 max-w-xl shadow-xl">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                  alt="Learner"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                  alt="Learner"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80"
                  alt="Learner"
                />
              </div>
              <div className="text-xs">
                <p className="font-bold text-white flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-amber-400 inline" /> 54,000+ Engineers
                </p>
                <p className="text-slate-400 font-medium">Curricula from MIT, Stanford & Meta</p>
              </div>
            </div>

            <div className="h-8 w-[1px] bg-white/[0.08] hidden sm:block" />

            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-xs font-bold text-white">
                4.9/5 <span className="text-slate-400 font-normal font-mono">(12k reviews)</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Enterprise 3D WebGL Neural Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-6 relative"
        >
          {/* Ambient Radial Backlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none -z-10" />

          {/* 3D Scene with 3 Telemetry Cards */}
          <Hero3DScene />
        </motion.div>
      </div>
    </section>
  );
};
