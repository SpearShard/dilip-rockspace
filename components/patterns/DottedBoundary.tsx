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
        className={`boundary-line absolute top-0 left-0 md:left-10 h-full w-3 overflow-visible opacity-0 ${className}`}
        aria-hidden="true"
      >
        <line x1="10" y1="0" x2="10" y2="100%" stroke={color} strokeWidth={strokeWidth} strokeDasharray={dash} strokeLinecap="round" />
      </svg>
      <svg
        ref={rightRef}
        className={`boundary-line absolute top-0 right-0 md:right-10 h-full w-3 overflow-visible opacity-0 ${className}`}
        aria-hidden="true"
      >
        <line x1="0" y1="0" x2="0" y2="100%" stroke={color} strokeWidth={strokeWidth} strokeDasharray={dash} strokeLinecap="round" />
      </svg>
    </>
  );
}
