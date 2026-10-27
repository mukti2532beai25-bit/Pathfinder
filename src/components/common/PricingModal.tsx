import React from 'react';
import { motion } from 'framer-motion';
import { X, Check, Sparkles, Zap, Shield, Star } from 'lucide-react';
import { sounds } from '../../utils/audio';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose, onSelectPlan }) => {
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
        className="relative z-10 w-full max-w-3xl rounded-3xl glass-panel-deep p-6 sm:p-8 border border-white/90 shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400/40 flex items-center justify-center text-amber-950">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">Simple, Transparent Pricing</h3>
              <p className="text-xs text-slate-500">Free forever for ambitious learners, upgrade for 24/7 AI mentoring</p>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          {/* Free Tier */}
          <div className="glass-panel p-6 rounded-2xl border border-white/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Free Learner</span>
                <span className="glass-pill text-[10px] font-bold text-slate-700 px-2 py-0.5 rounded-full">Forever Free</span>
              </div>
              <div className="text-3xl font-extrabold text-slate-900 mb-4">$0 <span className="text-xs text-slate-500 font-normal">/ month</span></div>
              <p className="text-xs text-slate-600 mb-6">Full access to dynamic roadmap generation, tracking, and exercises.</p>

              <div className="space-y-2.5 text-xs font-medium text-slate-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Unlimited 3D learning path generation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Curated courses from MIT, Stanford & Coursera</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Interactive completion progress tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>JSON & PDF roadmap export</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                onClose();
                onSelectPlan();
              }}
              className="mt-6 w-full glass-pill py-2.5 rounded-xl font-bold text-xs text-slate-800 hover:bg-white transition-all border border-slate-200"
            >
              Current Plan
            </button>
          </div>

          {/* Pro Tier */}
          <div className="glass-panel-deep p-6 rounded-2xl border-2 border-amber-400/80 shadow-glow-amber relative flex flex-col justify-between">
            <div className="absolute top-3 right-4">
              <span className="bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-sm">
                Most Popular
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">PathFinder Pro</span>
              </div>
              <div className="text-3xl font-extrabold text-slate-900 mb-4">$12 <span className="text-xs text-slate-500 font-normal">/ month</span></div>
              <p className="text-xs text-slate-600 mb-6">For engineers aiming for rapid career shifts and FAANG placement.</p>

              <div className="space-y-2.5 text-xs font-medium text-slate-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-600" />
                  <span>Everything in Free, plus:</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-600" />
                  <span>24/7 AI Code Review & Solution Debugger</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-600" />
                  <span>Direct GitHub repository sync for capstones</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-600" />
                  <span>Verifiable On-Chain & PDF Skill Certificates</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                sounds.playMagic();
                onClose();
                onSelectPlan();
              }}
              className="mt-6 w-full btn-3d-amber py-2.5 rounded-xl font-extrabold text-xs text-slate-950 flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start 14-Day Free Trial</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
