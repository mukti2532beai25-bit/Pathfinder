import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Morphing glowing ambient gradient orb
function AmbientOrb({
  position,
  color,
  emissiveColor,
  scale = 1,
  speed = 1,
  floatOffset = 0,
}: {
  position: [number, number, number];
  color: string;
  emissiveColor: string;
  scale?: number;
  speed?: number;
  floatOffset?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const initialPos = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + floatOffset;
    if (meshRef.current) {
      meshRef.current.position.x = initialPos.x + Math.sin(t * 0.4) * 0.8;
      meshRef.current.position.y = initialPos.y + Math.cos(t * 0.5) * 0.9;
      meshRef.current.position.z = initialPos.z + Math.sin(t * 0.3) * 0.5;

      meshRef.current.rotation.x = t * 0.15;
      meshRef.current.rotation.y = t * 0.2;

      // Subtle organic breathing scale
      const breath = 1 + Math.sin(t * 0.7) * 0.08;
      meshRef.current.scale.set(scale * breath, scale * breath, scale * breath);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1.6, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={emissiveColor}
        emissiveIntensity={0.8}
        roughness={0.2}
        metalness={0.1}
        transparent
        opacity={0.22}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// Subtle floating 3D geometric particles reacting to mouse parallax
function FloatingParticles({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const count = 75;
  const groupRef = useRef<THREE.Group>(null!);

  const particles = useMemo(() => {
    const temp = [];
    const geometries = ['tetra', 'octa', 'icosa', 'torus'] as const;
    const colors = ['#F59E0B', '#FBBF24', '#38BDF8', '#10B981', '#FDE68A'];

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 26;
      const y = (Math.random() - 0.5) * 18;
      const z = (Math.random() - 0.5) * 14 - 3;
      const scale = Math.random() * 0.16 + 0.06;
      const speed = Math.random() * 0.6 + 0.3;
      const rotSpeedX = (Math.random() - 0.5) * 0.02;
      const rotSpeedY = (Math.random() - 0.5) * 0.02;
      const type = geometries[Math.floor(Math.random() * geometries.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];

      temp.push({ x, y, z, scale, speed, rotSpeedX, rotSpeedY, type, color, seed: Math.random() * 10 });
    }
    return temp;
  }, [count]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      // Smooth mouse parallax damping
      const targetX = mousePosition.x * 0.8;
      const targetY = mousePosition.y * 0.8;
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, idx) => (
        <ParticleItem key={idx} particle={p} />
      ))}
    </group>
  );
}

function ParticleItem({
  particle,
}: {
  particle: {
    x: number;
    y: number;
    z: number;
    scale: number;
    speed: number;
    rotSpeedX: number;
    rotSpeedY: number;
    type: 'tetra' | 'octa' | 'icosa' | 'torus';
    color: string;
    seed: number;
  };
}) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime() * particle.speed + particle.seed;
      meshRef.current.position.y = particle.y + Math.sin(t) * 0.6;
      meshRef.current.position.x = particle.x + Math.cos(t * 0.7) * 0.3;
      meshRef.current.rotation.x += particle.rotSpeedX;
      meshRef.current.rotation.y += particle.rotSpeedY;
    }
  });

  return (
    <mesh ref={meshRef} position={[particle.x, particle.y, particle.z]} scale={particle.scale}>
      {particle.type === 'tetra' && <tetrahedronGeometry args={[1, 0]} />}
      {particle.type === 'octa' && <octahedronGeometry args={[1, 0]} />}
      {particle.type === 'icosa' && <icosahedronGeometry args={[1, 0]} />}
      {particle.type === 'torus' && <torusGeometry args={[0.9, 0.3, 12, 24]} />}
      <meshStandardMaterial
        color={particle.color}
        roughness={0.3}
        metalness={0.6}
        transparent
        opacity={0.45}
      />
    </mesh>
  );
}

export const BackgroundCanvas3D: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x: normX, y: normY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hasWebGL ? (
        <Canvas
          camera={{ position: [0, 0, 11], fov: 50 }}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 8]} intensity={1.2} color="#FEF3C7" />
          <pointLight position={[-8, -5, 5]} intensity={1.5} color="#38BDF8" />
          <pointLight position={[8, -4, 5]} intensity={1.5} color="#10B981" />

          {/* 4 Glowing Ambient Gradient Orbs */}
          {/* Warm Amber */}
          <AmbientOrb
            position={[-5, 3, -2]}
            color="#F59E0B"
            emissiveColor="#F59E0B"
            scale={1.8}
            speed={0.6}
            floatOffset={0}
          />
          {/* Golden Yellow */}
          <AmbientOrb
            position={[5.5, 2.5, -3]}
            color="#FBBF24"
            emissiveColor="#FBBF24"
            scale={2.2}
            speed={0.5}
            floatOffset={1.5}
          />
          {/* Soft Sky Blue */}
          <AmbientOrb
            position={[-6, -3.5, -2]}
            color="#38BDF8"
            emissiveColor="#0EA5E9"
            scale={1.9}
            speed={0.7}
            floatOffset={3.2}
          />
          {/* Emerald */}
          <AmbientOrb
            position={[5, -4, -2.5]}
            color="#10B981"
            emissiveColor="#10B981"
            scale={1.6}
            speed={0.55}
            floatOffset={4.8}
          />

          {/* Geometric particles reacting to mouse */}
          <FloatingParticles mousePosition={mousePos} />
        </Canvas>
      ) : (
        /* CSS Fallback if WebGL is disabled */
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-amber-400/20 blur-3xl animate-pulse" />
          <div className="absolute top-20 right-10 w-[30rem] h-[30rem] rounded-full bg-amber-300/25 blur-3xl animate-pulse delay-1000" />
          <div className="absolute bottom-10 left-20 w-[26rem] h-[26rem] rounded-full bg-sky-400/20 blur-3xl animate-pulse delay-700" />
          <div className="absolute bottom-10 right-20 w-80 h-80 rounded-full bg-emerald-400/20 blur-3xl animate-pulse delay-500" />
        </div>
      )}
    </div>
  );
};
