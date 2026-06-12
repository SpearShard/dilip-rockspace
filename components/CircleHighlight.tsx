'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function CircleHighlight({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const path = ref.current?.querySelector('path');
    if (!path) return;
    gsap.fromTo(path,
      { strokeDashoffset: 1 },
      {
        strokeDashoffset: 0,
        duration: 1.4,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      }
    );
  }, { scope: ref });

  return (
    <span ref={ref} className={`circle-draw ${className}`}>
      {children}
      <svg viewBox="0 0 120 60" preserveAspectRatio="none">
        <path
          d="M10 30 Q 10 5, 60 5 Q 110 5, 110 30 Q 110 55, 60 55 Q 10 55, 10 30"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}
