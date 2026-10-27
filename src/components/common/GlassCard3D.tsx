import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface GlassCard3DProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  tiltIntensity?: number; // default 15 degrees
  glareOpacity?: number; // default 0.35
  enableElevation?: boolean;
}

export const GlassCard3D: React.FC<GlassCard3DProps> = ({
  children,
  className = '',
  onClick,
  tiltIntensity = 12,
  glareOpacity = 0.3,
  enableElevation = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width) * 2 - 1; // -1 to 1
    const normY = (y / rect.height) * 2 - 1; // -1 to 1

    // Inverted rotateX gives natural tilt (pushing card into screen)
    setRotateX(-normY * tiltIntensity);
    setRotateY(normX * tiltIntensity);

    // Glare coordinates in percentages
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePos({ x: 50, y: 50 });
  };

  return (
    <div style={{ perspective: 1000 }} className="relative group">
      <motion.div
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX,
          rotateY,
          scale: isHovered && enableElevation ? 1.02 : 1,
          y: isHovered && enableElevation ? -6 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
          mass: 0.5,
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
        className={`relative overflow-hidden rounded-2xl glass-card transition-shadow duration-300 ${
          onClick ? 'cursor-pointer' : ''
        } ${className}`}
      >
        {/* Dynamic Specular Glare Reflection */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300 z-20"
          style={{
            opacity: isHovered ? glareOpacity : 0,
            background: `radial-gradient(circle 260px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.75), transparent 70%)`,
          }}
        />

        {/* Ambient Top Luminous Highlight Edge */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none z-10" />

        {/* Card Content with 3D Z-elevation */}
        <div style={{ transform: 'translateZ(20px)' }} className="relative z-10 h-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
};
