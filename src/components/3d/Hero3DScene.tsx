import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Target, Code2, TrendingUp, Cpu, Sparkles } from 'lucide-react';

// Fiber-Optic Splines & Constellation Nodes
function NeuralPathwayGraph({ mousePos }: { mousePos: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null!);

  // Ascending 3D Node positions
  const nodePositions = useMemo(() => [
    new THREE.Vector3(-2.6, -2.4, 0.6),
    new THREE.Vector3(-1.4, -1.3, 1.2),
    new THREE.Vector3(-0.2, -0.4, 0.4),
    new THREE.Vector3(1.1, 0.5, -0.2),
    new THREE.Vector3(0.5, 1.6, -0.7),
    new THREE.Vector3(2.0, 2.7, 0.1),
  ], []);

  // Primary Spline Curve
  const spline = useMemo(() => {
    return new THREE.CatmullRomCurve3(nodePositions);
  }, [nodePositions]);

  const tubeGeo = useMemo(() => {
    return new THREE.TubeGeometry(spline, 120, 0.045, 8, false);
  }, [spline]);

  const outerPulseGeo = useMemo(() => {
    return new THREE.TubeGeometry(spline, 120, 0.08, 8, false);
  }, [spline]);

  // Traveling Data Pulses (Photons)
  const pulseCount = 3;
  const pulseMeshes = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime();

    // Smooth damped mouse parallax rig
    if (groupRef.current) {
      const targetRotY = mousePos.x * 0.22;
      const targetRotX = -mousePos.y * 0.15;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
    }

    // Move traveling light pulses along the spline
    for (let i = 0; i < pulseCount; i++) {
      const mesh = pulseMeshes.current[i];
      if (mesh) {
        const offset = i * 0.333;
        const progress = (t * 0.35 + offset) % 1.0;
        const pos = spline.getPointAt(progress);
        mesh.position.copy(pos);
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Fiber-Optic Conduit Cable */}
      <mesh geometry={tubeGeo}>
        <meshStandardMaterial
          color="#1E293B"
          emissive="#334155"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* 2. Glowing Transparent Conduit Sheath */}
      <mesh geometry={outerPulseGeo}>
        <meshStandardMaterial
          color="#F59E0B"
          emissive="#D97706"
          emissiveIntensity={0.8}
          transparent
          opacity={0.35}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* 3. Traveling Light Energy Pulses */}
      {[...Array(pulseCount)].map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (pulseMeshes.current[i] = el)}
        >
          <sphereGeometry args={[0.13, 16, 16]} />
          <meshBasicMaterial color="#FEF3C7" />
        </mesh>
      ))}

      {/* 4. Constellation Octahedron Nodes */}
      {nodePositions.map((pos, idx) => {
        const isMasterNode = idx === nodePositions.length - 1;
        const color = isMasterNode ? '#FBBF24' : idx % 2 === 0 ? '#38BDF8' : '#F59E0B';
        return (
          <group key={idx} position={pos}>
            {/* Geometric Node Mesh */}
            <mesh>
              <octahedronGeometry args={[isMasterNode ? 0.32 : 0.22, 0]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={1.4}
                metalness={0.9}
                roughness={0.15}
              />
            </mesh>

            {/* Orbiting Orbital Ring */}
            <mesh rotation={[Math.PI / 3, idx, 0]}>
              <torusGeometry args={[isMasterNode ? 0.48 : 0.35, 0.015, 8, 24]} />
              <meshBasicMaterial color={color} transparent opacity={0.6} />
            </mesh>

            {/* Point Light at Each Node */}
            <pointLight color={color} intensity={isMasterNode ? 2.5 : 1.2} distance={2.5} />
          </group>
        );
      })}

      {/* 5. Ambient Data Sparkles */}
      <AmbientConstellationDust count={50} />
    </group>
  );
}

function AmbientConstellationDust({ count }: { count: number }) {
  const particles = useMemo(() => {
    const list = [];
    for (let i = 0; i < count; i++) {
      list.push({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 7,
          (Math.random() - 0.5) * 4
        ),
        scale: Math.random() * 0.04 + 0.02,
        color: Math.random() > 0.5 ? '#FBBF24' : '#38BDF8',
      });
    }
    return list;
  }, [count]);

  return (
    <group>
      {particles.map((p, idx) => (
        <mesh key={idx} position={p.pos} scale={p.scale}>
          <tetrahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color={p.color} transparent opacity={0.65} />
        </mesh>
      ))}
    </group>
  );
}

export const Hero3DScene: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x: normX, y: normY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-[520px] lg:h-[620px] flex items-center justify-center select-none">
      {/* 3D WebGL Neural Scene Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0.5, 0.4, 6.2], fov: 48 }}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[6, 8, 6]} intensity={1.2} color="#FBBF24" />
          <pointLight position={[-4, 3, 2]} intensity={1.5} color="#06B6D4" />
          <pointLight position={[4, -3, 2]} intensity={1.2} color="#F59E0B" />

          {/* Neural Pathway Graph */}
          <NeuralPathwayGraph mousePos={mousePos} />
        </Canvas>
      </div>

      {/* 3 Floating Smoked-Glass HUD Telemetry Cards */}

      {/* 1. Top Right (PHASE 03 // TARGET): Glowing Amber Target Icon | "Master" — Your Goals */}
      <motion.div
        animate={{
          y: [-6, 6, -6],
          x: [2, -2, 2],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-6 right-2 sm:right-6 md:right-8 z-20 pointer-events-auto"
      >
        <div className="glass-panel p-4 rounded-2xl flex items-center gap-4 border border-white/[0.12] hover:border-amber-500/40 shadow-2xl backdrop-blur-2xl max-w-[240px] transition-all">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500/20 to-amber-400/10 flex items-center justify-center border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.25)] shrink-0">
            <Target className="w-5 h-5 text-amber-400" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-mono tracking-widest text-amber-400 font-bold uppercase">
              PHASE 03 // TARGET
            </div>
            <div className="text-base font-extrabold text-white leading-tight">Master</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-slate-400 font-medium italic">Your Goals</span>
              {/* SVG Progress Ring at 92% */}
              <div className="relative w-4 h-4 shrink-0">
                <svg className="w-4 h-4 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-800"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-amber-400"
                    strokeDasharray="92, 100"
                    strokeWidth="4"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. Middle Left (PHASE 02 // LABS): Glowing Cyan Pencil/Code Icon | "Practice" — With Exercises */}
      <motion.div
        animate={{
          y: [7, -7, 7],
          x: [-3, 3, -3],
        }}
        transition={{
          duration: 6.2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.8,
        }}
        className="absolute top-[48%] -left-2 sm:left-4 md:left-6 z-20 pointer-events-auto"
      >
        <div className="glass-panel p-4 rounded-2xl flex items-center gap-4 border border-white/[0.12] hover:border-cyan-500/40 shadow-2xl backdrop-blur-2xl max-w-[245px] transition-all">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-cyan-400/10 flex items-center justify-center border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.25)] shrink-0">
            <Code2 className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase">
              PHASE 02 // LABS
            </div>
            <div className="text-base font-extrabold text-white leading-tight">Practice</div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-[11px] text-cyan-300">14/14 Live Labs</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 3. Bottom Right (PHASE 01 // VELOCITY): Glowing Emerald Chart Icon | "Achieve" — New Skills */}
      <motion.div
        animate={{
          y: [-5, 7, -5],
          x: [3, -3, 3],
        }}
        transition={{
          duration: 5.8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.6,
        }}
        className="absolute bottom-8 right-2 sm:right-8 md:right-10 z-20 pointer-events-auto"
      >
        <div className="glass-panel p-4 rounded-2xl flex items-center gap-4 border border-white/[0.12] hover:border-emerald-500/40 shadow-2xl backdrop-blur-2xl max-w-[240px] transition-all">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-500/20 to-emerald-400/10 flex items-center justify-center border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.25)] shrink-0">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-mono tracking-widest text-emerald-400 font-bold uppercase">
              PHASE 01 // VELOCITY
            </div>
            <div className="text-base font-extrabold text-white leading-tight">Achieve</div>
            {/* Minimalist SVG Sparkline */}
            <div className="flex items-center gap-2 mt-1">
              <svg className="w-14 h-4 text-emerald-400" viewBox="0 0 60 16">
                <path
                  d="M0 12 Q 15 4, 30 9 T 60 2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span className="font-mono text-[11px] font-bold text-emerald-400">+42%</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
