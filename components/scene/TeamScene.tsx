'use client';

import { Suspense, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function DesignScene() {
  const groupRef = useRef<THREE.Group>(null);

  const shapes = useMemo(() => {
    const items: { pos: [number, number, number]; color: string; size: number; speed: number; offset: number }[] = [];
    const colors = ['#A78BFA', '#7C3AED', '#DDD6FE', '#FF8A65'];
    for (let i = 0; i < 6; i++) {
      const theta = (i / 6) * Math.PI * 2;
      const f = i * 0.137;
      items.push({
        pos: [Math.cos(theta) * 1.5, Math.sin(theta) * 1.2, 0],
        color: colors[i % colors.length],
        size: 0.08 + (i % 3) * 0.03,
        speed: 0.3 + (i % 4) * 0.1,
        offset: f,
      });
    }
    return items;
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.z = t * 0.05;
    groupRef.current.rotation.x = Math.sin(t * 0.03) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {shapes.map((s, i) => (
        <mesh key={i} position={s.pos}>
          <boxGeometry args={[s.size, s.size, s.size]} />
          <meshPhysicalMaterial color={s.color} metalness={0.3} roughness={0.2} transparent opacity={0.2} />
        </mesh>
      ))}
    </group>
  );
}

function CodeScene() {
  const ref = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const count = 400;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t1 = (i * 0.317) % 1;
      const t2 = (i * 0.573) % 1;
      const t3 = (i * 0.839) % 1;
      const x = (t1 - 0.5) * 4;
      const y = (t2 - 0.5) * 4;
      const z = (t3 - 0.5) * 4;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      const c = new THREE.Color('#7C3AED');
      const brightness = 0.3 + t1 * 0.4;
      col[i * 3] = c.r * brightness;
      col[i * 3 + 1] = c.g * brightness;
      col[i * 3 + 2] = c.b * brightness;
    }
    return [pos, col];
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.04;
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.02) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
        <bufferAttribute args={[colors, 3]} attach="attributes-color" />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.3} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function AutomationScene() {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    const count = 8;
    const positions = [];
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2;
      positions.push([Math.cos(theta) * 1, Math.sin(theta) * 0.8, 0]);
    }
    return positions;
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.z = t * 0.03;
    groupRef.current.rotation.y = Math.sin(t * 0.02) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#A78BFA" transparent opacity={0.3} />
        </mesh>
      ))}
      {nodes.flatMap((a, i) =>
        nodes.slice(i + 1).map((b, j) => (
          <line key={`${i}-${j}`}>
            <bufferGeometry>
              <bufferAttribute
                args={[new Float32Array([...a, ...b]), 3]}
                attach="attributes-position"
              />
            </bufferGeometry>
            <lineBasicMaterial color="#A78BFA" transparent opacity={0.04} />
          </line>
        ))
      )}
    </group>
  );
}

function SceneInner({ persona }: { persona: number }) {
  const scenes = [<DesignScene key="design" />, <CodeScene key="code" />, <AutomationScene key="auto" />];
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 3, 3]} intensity={0.3} />
      {scenes[persona]}
    </>
  );
}

export default function TeamPersonaScene({ persona = 0 }: { persona?: number }) {
  const [reduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  if (reduced) return null;

  return (
    <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
      <Suspense fallback={null}>
        <SceneInner persona={persona} />
      </Suspense>
    </Canvas>
  );
}
