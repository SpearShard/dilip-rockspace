'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const links = [
  { href: '#services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '#process', label: 'Process' },
  { href: '#team', label: 'Team' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const lastScroll = useRef(0);
  const mounted = useRef(false);
  const [hidden, setHidden] = useState(false);

  useGSAP(() => {
    const header = headerRef.current;
    if (!header) return;

    if (!mounted.current) {
      mounted.current = true;
      gsap.set(header, { y: -100 });
      gsap.to(header, { y: 0, duration: 0.6, ease: 'power3.out' });
    }

    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastScroll.current;
      if (y > 200 && goingDown && !hidden) {
        setHidden(true);
        gsap.to(header, { y: -120, duration: 0.3, ease: 'power2.inOut' });
      } else if ((!goingDown || y <= 200) && hidden) {
        setHidden(false);
        gsap.to(header, { y: 0, duration: 0.3, ease: 'power2.inOut' });
      }
      lastScroll.current = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [hidden]);

  useGSAP(() => {
    const header = headerRef.current;
    if (!header) return;
    header.querySelectorAll('.nav-link').forEach((link) => {
      const line = document.createElement('span');
      line.className = 'absolute bottom-0 left-0 w-full h-px bg-accent-dark scale-x-0 origin-left transition-transform duration-300';
      link.appendChild(line);
      link.addEventListener('mouseenter', () => gsap.to(line, { scaleX: 1, duration: 0.3, ease: 'power2.out' }));
      link.addEventListener('mouseleave', () => gsap.to(line, { scaleX: 0, duration: 0.3, ease: 'power2.out' }));
    });
  }, { scope: headerRef });

  return (
    <>
      <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 mt-4">
        <div className="max-w-7xl mx-auto bg-accent-light/70 backdrop-blur-xl border border-accent/10 rounded-2xl px-6 h-16 md:h-16 flex items-center justify-between shadow-lg shadow-accent-dark/5">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="text-xl leading-none text-accent-dark group-hover:text-accent-dark/80 transition-colors drop-shadow-[0_0_8px_rgba(167,139,250,0.25)]">
              ◆
            </span>
            <span className="text-text font-bold tracking-tight text-sm hidden sm:block">
              Rock<span className="text-text/40">Space</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => {
              const isRoute = link.href.startsWith('/');
              const Tag = isRoute ? Link : 'a';
              const props = isRoute ? { href: link.href } : { href: link.href };
              return (
                <Tag key={link.href} {...props} className="nav-link relative text-[14px] font-semibold text-text/60 hover:text-text transition-colors tracking-wide">
                  {link.label}
                </Tag>
              );
            })}
            <a href="#contact" className="btn-glow px-5 py-2 text-[13px] font-medium text-white bg-accent-dark rounded-full hover:bg-accent-dark/90 transition-all tracking-wide shadow-sm">
              Let&apos;s talk
            </a>
          </nav>

          <button
            onClick={() => {
              const menu = menuRef.current;
              if (!menu) return;
              menu.classList.toggle('hidden');
              if (!menu.classList.contains('hidden')) {
                gsap.fromTo(menu, { opacity: 0 }, { opacity: 1, duration: 0.3 });
                gsap.fromTo(menu.querySelectorAll('.menu-item'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.4, ease: 'power3.out' });
              }
            }}
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            aria-label="Menu"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className="w-full h-[1.5px] bg-text block transition-transform duration-300" />
              <span className="w-full h-[1.5px] bg-text block transition-opacity duration-300" />
              <span className="w-full h-[1.5px] bg-text block transition-transform duration-300" />
            </div>
          </button>
        </div>
      </header>

      <div
        ref={menuRef}
        className="hidden fixed inset-0 z-40 bg-accent-light flex flex-col items-center justify-center md:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <nav className="flex flex-col items-center gap-8">
          {links.map((link) => {
            const isRoute = link.href.startsWith('/');
            const Tag = isRoute ? Link : 'a';
            const props = isRoute ? { href: link.href, onClick: () => { menuRef.current?.classList.add('hidden'); } } : { href: link.href };
            return (
              <Tag key={link.href} {...props} className="menu-item text-3xl text-text-muted hover:text-text transition-colors">
                {link.label}
              </Tag>
            );
          })}
          <a href="#contact" className="menu-item mt-4 px-8 py-3 text-lg text-white bg-accent-dark rounded-full" onClick={() => menuRef.current?.classList.add('hidden')}>
            Let&apos;s talk
          </a>
        </nav>
      </div>
    </>
  );
}
