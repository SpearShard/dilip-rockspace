'use client';

import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Ring() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.rotation.x = Math.sin(t * 0.2) * 0.3;
    ref.current.rotation.y = t * 0.15;
    ref.current.position.y = Math.sin(t * 0.4) * 0.15;
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[1.1, 0.04, 32, 64]} />
      <meshPhysicalMaterial
        color="#A78BFA"
        metalness={0.6}
        roughness={0.2}
        transparent
        opacity={0.15}
      />
    </mesh>
  );
}

function Ring2() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.rotation.x = Math.sin(t * 0.15 + 1) * 0.4;
    ref.current.rotation.y = -t * 0.1;
    ref.current.position.y = Math.sin(t * 0.3 + 1) * 0.2;
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[1.4, 0.02, 24, 48]} />
      <meshPhysicalMaterial
        color="#FF8A65"
        metalness={0.3}
        roughness={0.5}
        transparent
        opacity={0.1}
      />
    </mesh>
  );
}

function SceneInner() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} intensity={0.3} />
      <Ring />
      <Ring2 />
    </>
  );
}

export default function ProcessScene() {
  const [reduced] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  if (reduced) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 40 }}
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
