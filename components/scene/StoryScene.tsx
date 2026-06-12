'use client';

import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function MorphingShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const clockRef = useRef(0);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    clockRef.current = t;

    meshRef.current.rotation.x = t * 0.2;
    meshRef.current.rotation.y = t * 0.3;
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.2;

    const geo = meshRef.current.geometry as THREE.IcosahedronGeometry;
    const positions = geo.attributes.position;
    const array = positions.array as Float32Array;
    for (let i = 0; i < array.length; i += 3) {
      const x = array[i], y = array[i + 1], z = array[i + 2];
      const len = Math.sqrt(x * x + y * y + z * z);
      const noise = 1 + Math.sin(t * 0.8 + i * 0.1) * 0.08;
      array[i] = (x / len) * noise;
      array[i + 1] = (y / len) * noise;
      array[i + 2] = (z / len) * noise;
    }
    positions.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.2, 1]} />
      <meshPhysicalMaterial
        color="#A78BFA"
        metalness={0.4}
        roughness={0.3}
        transparent
        opacity={0.2}
        wireframe
      />
    </mesh>
  );
}

function SceneInner() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 3]} intensity={0.4} />
      <directionalLight position={[-3, -3, -3]} intensity={0.2} color="#FF8A65" />
      <MorphingShape />
    </>
  );
}

export default function StoryScene() {
  const [reduced] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  if (reduced) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 40 }}
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
