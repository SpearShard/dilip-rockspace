'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export default function HeroHeadline({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const chars = el.querySelectorAll('.hero-char');
    if (!chars.length) return;

    gsap.fromTo(chars, { opacity: 0, y: 48, rotateX: -40 }, {
      opacity: 1, y: 0, rotateX: 0,
      duration: 0.85, ease: 'power3.out',
      stagger: 0.018,
      delay: 0.15,
    });
  }, []);

  const text = typeof children === 'string' ? children : '';
  if (!text) return <span ref={ref}>{children}</span>;

  return (
    <span ref={ref} style={{ perspective: '900px' }}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="hero-char inline-block"
          style={{ willChange: 'transform, opacity', opacity: 0 }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}
