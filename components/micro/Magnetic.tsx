'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function Magnetic({ children }: { children: React.ReactElement }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const move = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) * 0.4;
      const y = (e.clientY - top - height / 2) * 0.4;
      gsap.to(el, { x, y, duration: 1, ease: 'elastic.out(1, 0.3)' });
    };

    const leave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.3)' });
    };

    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);

    return () => {
      el.removeEventListener('mousemove', move);
      el.removeEventListener('mouseleave', leave);
    };
  }, []);

  return (
    <div ref={ref} className="inline-block relative">
      {children}
    </div>
  );
}