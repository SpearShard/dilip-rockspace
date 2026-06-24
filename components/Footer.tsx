'use client';

import Image from 'next/image';
import { Mail } from 'lucide-react';

const socials = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/rockspace.in/',
    icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/rkspace/posts/?feedView=all',
    icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'Mail',
    href: 'mailto:dilipseervi2308@gmail.com',
    icon: ({ className }: { className?: string }) => <Mail className={className} />,
  },
];

export default function Footer() {
  return (
    <footer className="w-full mt-16 md:mt-20 lg:mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-6 sm:pb-8">
        <div className="relative max-w-5xl mx-auto">
          <div className="rounded-3xl bg-accent px-8 sm:px-12 md:px-16 py-12 sm:py-14 md:py-16 overflow-hidden">
            {/* Subtle paper texture overlay */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)',
              }}
            />

            <div className="relative z-10 flex flex-col items-center text-center gap-5 sm:gap-6">
              {/* Logo + brand */}
              <div className="flex items-center gap-2.5">
                <div className="relative w-7 h-7 sm:w-8 sm:h-8 brightness-0 invert">
                  <Image
                    src="/Vector 2173.png"
                    alt=""
                    fill
                    className="object-contain"
                    sizes="32px"
                  />
                </div>
                <span className="text-xl sm:text-2xl font-[700] tracking-tight text-white">RockSpace</span>
              </div>

              <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-xs font-[500]">
                Three people. Three disciplines. One outcome.
              </p>

              {/* Social links */}
              <div className="flex items-center gap-3 sm:gap-4 mt-1">
                {socials.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl border border-white/20 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/40 transition-all duration-200"
                      aria-label={s.label}
                    >
                      <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                    </a>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="w-12 h-px bg-white/15 mt-1" />

              {/* Copyright */}
              <p className="text-xs sm:text-sm text-white/40 font-[500]">
                © 2025 RockSpace. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
