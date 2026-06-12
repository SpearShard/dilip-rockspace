'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function DottedDivider({
  className = '',
  dash = '12,12',
  color = 'var(--color-border)',
}: {
  className?: string;
  dash?: string;
  color?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    if (!svgRef.current) return;
    gsap.fromTo(svgRef.current, { opacity: 0 }, {
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: svgRef.current, start: 'top 95%', once: true },
    });
  });

  return (
    <svg ref={svgRef} className={`w-full h-px overflow-visible opacity-0 ${className}`} preserveAspectRatio="none" aria-hidden="true">
      <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke={color} strokeWidth="1" strokeDasharray={dash} strokeLinecap="round" />
    </svg>
  );
}
