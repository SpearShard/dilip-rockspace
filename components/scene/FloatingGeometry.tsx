'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';

function createStarShape() {
  const shape = new THREE.Shape();
  const tips = [2.0, 1.6, 1.0, 0.5];
  const inner = 0.4;

  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
    const isOuter = i % 2 === 0;
    const idx = Math.floor(i / 2);
    const r = isOuter ? tips[idx] : inner;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  return shape;
}

function createStarGeometry() {
  const shape = createStarShape();
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.6,
    bevelEnabled: true,
    bevelThickness: 0.2,
    bevelSize: 0.1,
    bevelSegments: 8,
  });
  geo.center();

  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const r = (i * 16807 + 42) % 2147483647;
    const noise = 0.85 + ((r - 1) / 2147483646) * 0.3;
    const crater = 1 - Math.sin((x * x + y * y + z * z) * 6) * 0.04;
    pos.setXYZ(i, x * noise * crater, y * noise * crater, z * noise * crater);
  }
  geo.computeVertexNormals();
  return geo;
}

function createSmallAsteroid(size: number, seed: number) {
  const geo = new THREE.IcosahedronGeometry(size, 1);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const len = Math.sqrt(x * x + y * y + z * z);
    const r = ((i + seed) * 16807 + 42) % 2147483647;
    const noise = 0.7 + ((r - 1) / 2147483646) * 0.6;
    const crater = 1 - Math.sin(len * 10) * 0.06;
    pos.setXYZ(i, x * noise * crater, y * noise * crater, z * noise * crater);
  }
  geo.computeVertexNormals();
  return geo;
}

export default function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbitGroupRef = useRef<THREE.Group>(null);
  const smallRef = useRef<THREE.Group>(null);
  const targetRot = useRef(0);

  const [isMobile] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 640
  );
  const groupPos: [number, number, number] = [
    isMobile ? 0.3 : 1.8,
    isMobile ? 0.6 : 0.2,
    0,
  ];
  const starScale = isMobile ? 0.5 : 1;

  useEffect(() => {
    if (isMobile) return;
    const handleMouse = (e: MouseEvent) => {
      targetRot.current = ((e.clientX / window.innerWidth) - 0.5) * 1.5;
    };
    const handleLeave = () => { targetRot.current = 0; };
    window.addEventListener('mousemove', handleMouse);
    document.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouse);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [isMobile]);

  const starGeo = useMemo(() => createStarGeometry(), []);

  const asteroidData = useMemo(() => {
    function rng(seed: number) { const s = (seed * 16807 + 0) % 2147483647; return (s - 1) / 2147483646; }
    return [0, 1, 2, 3, 4].map(i => {
      const size = 0.06 + rng(42 + i * 3) * 0.1;
      return {
        geo: createSmallAsteroid(size, 42 + i * 7),
        pos: [(rng(42 + i * 3 + 1) - 0.5) * 3.5, (rng(42 + i * 3 + 2) - 0.5) * 2.5, (rng(42 + i * 3 + 3) - 0.5) * 3.5 - 1] as [number, number, number],
      };
    });
  }, []);

  const orbitPoints = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const t = (i / 64) * Math.PI * 1.8;
      const r = 2 + Math.sin(t * 0.6) * 0.2;
      pts.push(new THREE.Vector3(
        Math.cos(t + 0.3) * r,
        Math.sin(t * 0.6) * 0.35,
        Math.sin(t + 0.3) * r,
      ));
    }
    return pts;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    if (meshRef.current) {
      const current = meshRef.current.rotation.y;
      const diff = targetRot.current - current;
      meshRef.current.rotation.y += diff * 0.06;
      meshRef.current.position.y = Math.sin(t * 0.3) * 0.12;
    }

    if (smallRef.current) {
      smallRef.current.children.forEach((child, i) => {
        child.rotation.x = t * 0.08 * (0.5 + i * 0.1);
        child.rotation.y = t * 0.12 * (0.5 + i * 0.1);
      });
    }
  });

  return (
    <group position={groupPos} scale={starScale}>
      <mesh ref={meshRef} geometry={starGeo}>
        <MeshDistortMaterial
          color="#2A2A2E"
          emissive="#CCFF00"
          emissiveIntensity={0.1}
          metalness={0.15}
          roughness={0.65}
          transparent
          opacity={0.95}
          distort={0.35}
          speed={0.6}
        />
      </mesh>

      <group ref={orbitGroupRef}>
        <Line points={orbitPoints} color="#CCFF00" opacity={0.15} transparent lineWidth={1} />
      </group>

      <group ref={smallRef}>
        {asteroidData.map((ast, i) => (
          <mesh key={i} geometry={ast.geo} position={ast.pos}>
            <MeshDistortMaterial
              color="#36363C"
              emissive="#CCFF00"
              emissiveIntensity={0.02}
              metalness={0.1}
              roughness={0.8}
              distort={0.15}
              speed={0.4}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
