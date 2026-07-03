'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import SectionLabel from '@/components/micro/SectionLabel';

export default function PageHeader({
  eyebrow,
  title,
  description,
  children,
  align = 'left',
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
  align?: 'left' | 'center';
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(
      el.querySelectorAll('.page-reveal'),
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out', delay: 0.08 },
    );
  }, []);

  return (
    <div
      ref={ref}
      className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}
    >
      <div className={`page-reveal mb-5 sm:mb-6 ${align === 'center' ? 'flex justify-center' : ''}`} style={{ opacity: 0 }}>
        <SectionLabel>{eyebrow}</SectionLabel>
      </div>
      <h1 className="page-reveal display-heading" style={{ opacity: 0 }}>{title}</h1>
      {description && (
        <p className={`page-reveal mt-5 sm:mt-6 text-body-lg text-text-muted font-medium-ui leading-[1.55] max-w-xl ${align === 'center' ? 'mx-auto' : ''}`} style={{ opacity: 0 }}>
          {description}
        </p>
      )}
      {children && (
        <div className="page-reveal mt-10" style={{ opacity: 0 }}>{children}</div>
      )}
    </div>
  );
}
