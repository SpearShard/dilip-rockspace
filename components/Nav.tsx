'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const links = [
  { label: 'People', href: '#team' },
  { label: 'Origin', href: '#story' },
  { label: 'Work', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const lastScroll = useRef(0);
  const [activeSection, setActiveSection] = useState('');
  const initialAnimDone = useRef(false);

  useGSAP(() => {
    const header = headerRef.current;
    if (!header) return;

    if (!initialAnimDone.current) {
      initialAnimDone.current = true;
      gsap.set(header, { y: -100 });
      gsap.to(header, { y: 0, duration: 0.6, ease: 'power3.out', delay: 0.1 });
    }

    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastScroll.current;
      if (y > 200 && goingDown && !header.hasAttribute('data-hidden')) {
        header.setAttribute('data-hidden', 'true');
        gsap.to(header, { y: -100, duration: 0.35, ease: 'power2.inOut' });
      } else if ((!goingDown || y <= 200) && header.hasAttribute('data-hidden')) {
        header.removeAttribute('data-hidden');
        gsap.to(header, { y: 0, duration: 0.35, ease: 'power2.inOut' });
      }
      lastScroll.current = y;

      let current = '';
      links.forEach((l) => {
        const id = l.href.replace('#', '');
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

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-lg border-b border-border/50"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6">
          <Link href="/" className="relative flex items-center shrink-0">
            <Image src="/rockspace.png" alt="RockSpace" width={20} height={20} className="w-[18px] sm:w-[20px] h-[18px] sm:h-[20px] object-contain" />
          </Link>

          <nav className="hidden sm:flex items-center gap-0.5">
            {links.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  data-active={isActive}
                  className={`relative px-3 lg:px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-300 ${
                    isActive ? 'text-text' : 'text-text-tertiary hover:text-text/70'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-accent rounded-full" />
                  )}
                </a>
              );
            })}
            <a
              href="#contact"
              className="ml-2 lg:ml-3 px-4 lg:px-5 py-2 text-[13px] font-medium text-white bg-accent rounded-full hover:bg-accent/90 transition-all tracking-wide shadow-lg shadow-accent/20 hover:shadow-accent/30"
            >
              Reach out
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
            className="sm:hidden relative w-10 h-10 flex items-center justify-center"
            aria-label="Menu"
          >
            <div className="w-5 flex flex-col gap-1">
              <span className="w-full h-[1.5px] bg-text/50 block rounded-full" />
              <span className="w-full h-[1.5px] bg-text/50 block rounded-full" />
              <span className="w-full h-[1.5px] bg-text/50 block rounded-full" />
            </div>
          </button>
        </div>
      </header>

      <div
        ref={menuRef}
        className="hidden fixed inset-0 z-40 bg-white flex flex-col items-center justify-center sm:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <nav className="flex flex-col items-center gap-10">
          {links.map((link) => {
            const close = () => menuRef.current?.classList.add('hidden');
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={close}
                className="menu-item text-3xl text-text/40 hover:text-text transition-colors font-display font-[400] tracking-tight"
              >
                {link.label}
              </a>
            );
          })}
          <a
            href="#contact"
            className="menu-item mt-2 px-10 py-3.5 text-lg text-white bg-accent rounded-full shadow-lg shadow-accent/25"
            onClick={() => menuRef.current?.classList.add('hidden')}
          >
            Reach out
          </a>
        </nav>
      </div>
    </>
  );
}
