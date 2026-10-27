import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Compass, BarChart3, Lightbulb, Sparkles, ArrowUpRight } from 'lucide-react';
import { sounds } from '../../utils/audio';

interface FeatureItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  badge: string;
  orbGradient: string;
  glowColor: string;
  iconColor: string;
}

const FEATURES: FeatureItem[] = [
  {
    id: 'f1',
    title: 'Personalised',
    subtitle: 'Adaptive Intelligence',
    description: 'AI recommends courses based on your goals, current skill levels, and learning pace.',
    icon: UserCheck,
    badge: 'Tailored 1:1',
    orbGradient: 'from-amber-500/20 to-amber-400/10',
    glowColor: 'rgba(245, 158, 11, 0.3)',
    iconColor: 'text-amber-400',
  },
  {
    id: 'f2',
    title: 'Structured Roadmap',
    subtitle: 'Clear Milestones',
    description: 'Get a step-by-step plan with milestones, prerequisites, time budgets, and learning resources.',
    icon: Compass,
    badge: 'Zero Guesswork',
    orbGradient: 'from-emerald-500/20 to-emerald-400/10',
    glowColor: 'rgba(16, 185, 129, 0.3)',
    iconColor: 'text-emerald-400',
  },
  {
    id: 'f3',
    title: 'Track Progress',
    subtitle: 'Real-Time Insights',
    description: 'Visualise your growth and stay motivated with interactive milestones and smart completion insights.',
    icon: BarChart3,
    badge: 'Live Metrics',
    orbGradient: 'from-cyan-500/20 to-cyan-400/10',
    glowColor: 'rgba(6, 182, 212, 0.3)',
    iconColor: 'text-cyan-400',
  },
  {
    id: 'f4',
    title: 'Smart Recommendations',
    subtitle: 'Curated Quality',
    description: 'Discover relevant courses, exercises, code challenges, and next steps hand-picked by AI.',
    icon: Lightbulb,
    badge: 'MIT & Stanford',
    orbGradient: 'from-orange-500/20 to-amber-500/10',
    glowColor: 'rgba(249, 115, 22, 0.3)',
    iconColor: 'text-amber-400',
  },
];

export const FeatureGrid: React.FC<{ onFeatureClick?: (id: string) => void }> = ({ onFeatureClick }) => {
  return (
    <section className="relative z-10 py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 glass-pill px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300 mb-3 border border-amber-500/20">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Curriculum Architecture</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Engineered for Deep Mastery, Not Just Video Watching
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
          Every learning journey is synthesized from verified university syllabi and enterprise projects
          to bridge theory, deliberate practice, and real code.
        </p>
      </div>

      {/* 4 Smoked Glass Bento Cards Grid with Spotlight */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURES.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <SpotlightCard
              key={feature.id}
              onClick={() => {
                sounds.playClick();
                if (onFeatureClick) onFeatureClick(feature.id);
              }}
            >
              <div className="h-full p-6 flex flex-col justify-between">
                <div>
                  {/* Top Bar: Icon Orb + Pill Badge */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feature.orbGradient} p-0.5 flex items-center justify-center border border-white/[0.08] shadow-lg`}
                      style={{ boxShadow: `0 0 20px ${feature.glowColor}` }}
                    >
                      <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                    </div>

                    <span className="glass-pill text-[10px] font-mono font-bold text-slate-300 px-2.5 py-1 rounded-full border border-white/[0.08]">
                      {feature.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mb-2">
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block">
                      {feature.subtitle}
                    </span>
                    <h3 className="text-lg font-extrabold text-white tracking-tight mt-0.5">
                      {feature.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom link indicator */}
                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-amber-400 transition-colors">
                  <span>Explore Architecture</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
};

// Cursor Radial Spotlight Border Card Component
function SpotlightCard({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-2xl glass-card overflow-hidden group cursor-pointer border border-white/[0.08] hover:border-amber-500/40 transition-all duration-300 transform hover:-translate-y-1"
    >
      {/* Radial Cursor Spotlight Sheen */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: isHovered
            ? `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(245, 158, 11, 0.12), transparent 40%)`
            : 'none',
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
