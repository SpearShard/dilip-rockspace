'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface PillNavItem {
  label: string;
  href: string;
}

interface PillNavProps {
  logo?: string;
  logoAlt?: string;
  items: PillNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  theme?: 'light' | 'dark';
  initialLoadAnimation?: boolean;
}

export default function PillNav({
  logo,
  logoAlt = 'Logo',
  items,
  className = '',
  ease = 'power2.out',
  baseColor,
  pillColor,
  hoveredPillTextColor,
  pillTextColor,
  theme = 'dark',
  initialLoadAnimation = false,
}: PillNavProps) {
  const headerRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLElement | null)[]>([]);
  const navRef = useRef<HTMLElement>(null);
  const lastScroll = useRef(0);
  const [activeSection, setActiveSection] = useState('');

  const isDark = theme === 'dark';

  useGSAP(() => {
    const header = headerRef.current;
    if (!header) return;

    if (initialLoadAnimation) {
      gsap.set(header, { y: -80, scaleX: 0.95 });
      gsap.to(header, {
        y: 0, scaleX: 1, duration: 0.6, ease: 'power3.out', delay: 0.1,
      });
    }

    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastScroll.current;
      if (y > 250 && goingDown && !header.hasAttribute('data-hidden')) {
        header.setAttribute('data-hidden', 'true');
        gsap.to(header, { y: -100, opacity: 0, duration: 0.3, ease: 'power2.inOut' });
      } else if ((!goingDown || y <= 250) && header.hasAttribute('data-hidden')) {
        header.removeAttribute('data-hidden');
        gsap.to(header, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.inOut' });
      }
      lastScroll.current = y;

      let current = '';
      items.forEach((item) => {
        const id = item.href.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 300) current = id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const movePill = useCallback(() => {
    const pill = pillRef.current;
    if (!pill) return;
    const idx = items.findIndex((item) => item.href.replace('#', '') === activeSection);
    const activeEl = linksRef.current[idx];
    if (activeEl) {
      gsap.to(pill, {
        width: activeEl.offsetWidth,
        x: activeEl.offsetLeft,
        duration: 0.35,
        ease,
      });
    }
  }, [activeSection, items, ease]);

  useEffect(() => {
    movePill();
  }, [movePill]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const idx = items.findIndex((item) => item.href.replace('#', '') === activeSection);
    const activeEl = linksRef.current[idx];
    if (activeEl) {
      nav.scrollTo({ left: activeEl.offsetLeft - 16, behavior: 'smooth' });
    }
  }, [activeSection, items]);

  const resolvedBaseColor = baseColor || (isDark ? '#1C1816' : '#FFFFFF');
  const resolvedPillColor = pillColor || (isDark ? '#FFFFFF' : '#1C1816');
  const resolvedPillTextColor = pillTextColor || (isDark ? '#1C1816' : '#FFFFFF');
  const resolvedHoveredPillTextColor = hoveredPillTextColor || (isDark ? '#FFFFFF' : '#1C1816');

  return (
    <header
      ref={headerRef}
      className={`fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 z-50 max-w-[calc(100vw-16px)] sm:max-w-none ${className}`}
    >
      <div
        className="flex items-center rounded-full shadow-[0_4px_24px_-4px_rgba(0,0,0,0.15)]"
        style={{ backgroundColor: resolvedBaseColor }}
      >
        {logo && (
          <Link href="/" className="pl-2 sm:pl-3 pr-0.5 sm:pr-1 shrink-0">
            <Image src={logo} alt={logoAlt} width={18} height={18} className="object-contain sm:w-[22px] sm:h-[22px]" />
          </Link>
        )}

        <nav
          ref={navRef}
          className="relative flex items-center overflow-x-auto scrollbar-none"
          style={{ height: 30, gap: 1 }}
        >
          <div
            ref={pillRef}
            className="absolute top-0 left-0 h-full rounded-full pointer-events-none"
            style={{ backgroundColor: resolvedPillColor }}
          />
          {items.map((item, i) => {
            const isActive = activeSection === item.href.replace('#', '');
            const Tag = item.href.startsWith('/') ? Link : 'a';
            const props = item.href.startsWith('/') ? { href: item.href } : { href: item.href };
            return (
              <div key={item.href} className="relative z-10 flex shrink-0">
                <Tag
                  {...props}
                  ref={(el) => { linksRef.current[i] = el; }}
                  className="flex items-center px-2 sm:px-3 text-[10px] sm:text-[12px] font-semibold tracking-wide whitespace-nowrap rounded-full transition-colors duration-200 h-full"
                  style={{
                    color: isActive ? resolvedPillTextColor : (isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)'),
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = resolvedHoveredPillTextColor;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)';
                    }
                  }}
                >
                  {item.label}
                </Tag>
              </div>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
