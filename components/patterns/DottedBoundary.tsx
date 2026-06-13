'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function DottedBoundary({
  dash = '16,16',
  color = 'var(--color-text-muted)',
  strokeWidth = 1.5,
  className = '',
}: {
  dash?: string;
  color?: string;
  strokeWidth?: number;
  className?: string;
}) {
  const leftRef = useRef<SVGSVGElement>(null);
  const rightRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const el = leftRef.current?.parentElement;
    if (!el) return;
    gsap.fromTo(el.querySelectorAll('.boundary-line'), { opacity: 0 }, {
      opacity: 1, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });

  return (
    <>
      <svg
        ref={leftRef}
        className={`boundary-line absolute top-0 -left-3 md:-left-4 h-[calc(100%+4px)] w-3 overflow-visible opacity-0 ${className}`}
        aria-hidden="true"
      >
        <line x1="6" y1="0" x2="6" y2="100%" stroke={color} strokeWidth={strokeWidth} strokeDasharray={dash} strokeLinecap="round" />
      </svg>
      <svg
        ref={rightRef}
        className={`boundary-line absolute top-0 -right-3 md:-right-4 h-[calc(100%+4px)] w-3 overflow-visible opacity-0 ${className}`}
        aria-hidden="true"
      >
        <line x1="6" y1="0" x2="6" y2="100%" stroke={color} strokeWidth={strokeWidth} strokeDasharray={dash} strokeLinecap="round" />
      </svg>
    </>
  );
}
