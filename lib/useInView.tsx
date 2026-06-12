'use client';

import { useRef, useState, useEffect, type ReactNode } from 'react';

export function useInView(rootMargin = '150%') {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (inView) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { rootMargin, threshold: 0 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin, inView]);

  return { ref, inView };
}

export function SceneGate({ children, margin = '200%' }: { children: ReactNode; margin?: string }) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (show) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setShow(true); },
      { rootMargin: margin, threshold: 0 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [margin, show]);

  return <div ref={ref}>{show && children}</div>;
}
