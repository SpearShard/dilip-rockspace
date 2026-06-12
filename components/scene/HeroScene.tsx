'use client';

import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import FloatingGeometry from './FloatingGeometry';
import ParticleField from './ParticleField';

export default function HeroScene() {
  const [reduced] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  if (reduced) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <FloatingGeometry />
          <ParticleField />
          <Environment preset="studio" />
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#A78BFA" />
          <spotLight position={[0, 10, 0]} angle={0.3} intensity={0.3} color="#DDD6FE" />
        </Suspense>
      </Canvas>
    </div>
  );
}
