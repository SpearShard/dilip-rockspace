'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const links = [
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Contact', href: '/contact' },
];

export default function Nav() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLDivElement>(null);
  const isHome = pathname === '/';
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  const isActive = (href: string) => pathname === href;
  const hideCenter = isHome && pastHero;

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-6"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl border border-stone-200/60 bg-white/70 px-3 py-2 shadow-[0_8px_32px_rgba(23,18,15,0.04)] backdrop-blur-2xl sm:px-4">
        {/* Left: Vector 2173 + Brand */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 rounded-xl px-2 py-1 transition hover:bg-stone-100/60"
        >
          <span className="relative flex items-center gap-1.5">
            <div className="relative h-7 w-7 sm:h-8 sm:w-8">
              <Image
                src="/Vector 2173.png"
                alt="Rockspace"
                fill
                className="object-contain brightness-0"
                sizes="32px"
              />
            </div>
          </span>
          <span className="hidden text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-600 sm:inline">
            Rockspace
          </span>
        </Link>

        {/* Center: Nav Links — hide on home page when past hero */}
        <nav
          className={`hidden flex-1 items-center justify-center gap-1 sm:flex transition-all duration-300 ${
            hideCenter ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={`relative rounded-xl px-3 py-1.5 text-sm font-medium tracking-tight text-stone-500 transition-all duration-200 hover:text-stone-900 ${
                isActive(link.href) ? 'text-stone-900' : ''
              }`}
            >
              {isActive(link.href) && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-xl bg-stone-100"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right: CTA */}
        <Link
          href="/contact"
          className="rounded-xl bg-stone-900 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-all hover:bg-stone-800 hover:shadow-[0_4px_16px_rgba(23,18,15,0.12)]"
        >
          Reach out
        </Link>
      </div>
    </header>
  );
}
