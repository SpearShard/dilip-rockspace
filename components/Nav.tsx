'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

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
          <div className="relative h-7 w-7 sm:h-8 sm:w-8">
            <Image
              src="/Vector 2173.png"
              alt="Rockspace"
              fill
              className="object-contain brightness-0"
              sizes="32px"
            />
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-600">
            Rockspace
          </span>
        </Link>

        {/* Center: Nav Links — hide on home page when past hero */}
        {!hideCenter && (
          <nav className="hidden flex-1 items-center justify-center gap-1 sm:flex">
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
        )}

        {/* Right: CTA + Hamburger */}
        <div className="flex items-center gap-1.5">
          <Link
            href="/contact"
            className="hidden sm:inline-flex rounded-xl bg-stone-900 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-all hover:bg-stone-800 hover:shadow-[0_4px_16px_rgba(23,18,15,0.12)]"
          >
            Reach out
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex sm:hidden h-9 w-9 items-center justify-center rounded-xl transition hover:bg-stone-100"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="flex flex-col items-center gap-[5px]">
              <span
                className={`block h-px w-4 bg-stone-600 transition-all duration-300 ${
                  mobileOpen ? 'translate-y-[6px] rotate-45' : ''
                }`}
              />
              <span
                className={`block h-px w-4 bg-stone-600 transition-all duration-300 ${
                  mobileOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-px w-4 bg-stone-600 transition-all duration-300 ${
                  mobileOpen ? '-translate-y-[6px] -rotate-45' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-stone-200/60 bg-white/95 px-2 py-3 shadow-[0_16px_48px_rgba(23,18,15,0.08)] backdrop-blur-2xl sm:hidden"
          >
            <nav className="flex flex-col gap-0.5">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={`rounded-xl px-4 py-3 text-sm font-medium tracking-tight transition-all duration-200 ${
                    isActive(link.href)
                      ? 'bg-stone-100 text-stone-900'
                      : 'text-stone-500 hover:bg-stone-50 hover:text-stone-900'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
