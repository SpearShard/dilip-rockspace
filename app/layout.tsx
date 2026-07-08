'use client';

import { useEffect, useRef } from 'react';
import { Inter, Manrope } from 'next/font/google';
import { gsap } from 'gsap';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['500', '600', '700', '800'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dotRef.current || !outlineRef.current) return;
    
    // Leveraging quickTo bypasses React state for butter-smooth 60fps tracking
    const xDot = gsap.quickTo(dotRef.current, "x", { duration: 0.1, ease: "power3" });
    const yDot = gsap.quickTo(dotRef.current, "y", { duration: 0.1, ease: "power3" });
    const xOutline = gsap.quickTo(outlineRef.current, "x", { duration: 0.4, ease: "power3" });
    const yOutline = gsap.quickTo(outlineRef.current, "y", { duration: 0.4, ease: "power3" });

    const moveCursor = (e: MouseEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xOutline(e.clientX);
      yOutline(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="bg-[var(--color-bg)] text-[var(--color-text)]">
        <div ref={dotRef} className="cursor-dot hidden sm:block" />
        <div ref={outlineRef} className="cursor-outline hidden sm:block" />
        {children}
      </body>
    </html>
  );
}