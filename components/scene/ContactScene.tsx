'use client';

import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function DotField() {
  const ref = useRef<THREE.Points>(null);
  const count = 300;
  const positions = new Float32Array(count * 3);

  let seed = 12345;
  const rand = () => {
    seed = (seed * 16807 + 0) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (rand() - 0.5) * 10;
    positions[i * 3 + 1] = (rand() - 0.5) * 10;
    positions[i * 3 + 2] = (rand() - 0.5) * 6;
  }

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#A78BFA"
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function SceneInner() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <DotField />
    </>
  );
}

export default function ContactScene() {
  const [reduced] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  if (reduced) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <SceneInner />
      </Suspense>
    </Canvas>
  );
}
