'use client';

import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const colorA = useMemo(() => new THREE.Color('#A78BFA'), []);
  const colorB = useMemo(() => new THREE.Color('#7C3AED'), []);
  const colorC = useMemo(() => new THREE.Color('#DDD6FE'), []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    meshRef.current.rotation.x = t * 0.15 + my * 0.1;
    meshRef.current.rotation.y = t * 0.2 + mx * 0.1;
    meshRef.current.position.y = Math.sin(t * 0.4) * 0.15;

    const blend = Math.sin(t * 0.3) * 0.5 + 0.5;
    const blend2 = Math.sin(t * 0.2 + 1) * 0.5 + 0.5;
    const color = colorA.clone().lerp(colorB, blend).lerp(colorC, blend2 * 0.3);
    (meshRef.current.material as THREE.MeshPhysicalMaterial).color.set(color);

    const scale = 1 + Math.sin(t * 0.5) * 0.03;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.35, 128, 32]} />
      <MeshDistortMaterial
        color="#A78BFA"
        metalness={0.3}
        roughness={0.2}
        transparent
        opacity={0.85}
        distort={0.15}
        speed={1.5}
        envMapIntensity={1}
      />
    </mesh>
  );
}
