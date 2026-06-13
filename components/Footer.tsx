'use client';

import { Globe, MessageCircle, AtSign } from 'lucide-react';

function LogoIcon() {
  return (
    <div className="w-7 h-7 bg-accent rounded-[7px] flex items-center justify-center">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 20C4 20 4 14 10 10C16 6 20 4 20 4C20 4 18 8 14 14C10 20 4 20 4 20Z" fill="white" />
        <path d="M4 20L10 14" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

const socials = [
  { icon: Globe, label: 'Globe' },
  { icon: MessageCircle, label: 'Message' },
  { icon: AtSign, label: 'Email' },
];

const columns = [
  {
    header: 'Product',
    links: ['Features', 'Solutions', 'Pricing', 'Updates'],
  },
  {
    header: 'Science',
    links: ['Approach', 'Identity', 'Research', 'Metrics'],
  },
  {
    header: 'Company',
    links: ['About Us', 'Partners', 'Careers'],
  },
];

export default function Footer() {
  return (
    <footer className="w-full mt-12 md:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative max-w-5xl mx-auto">
          <div className="border-t border-border/30 pt-10 pb-8">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16">
              <div className="md:w-64 shrink-0 space-y-3">
                <div className="flex items-center gap-2">
                  <LogoIcon />
                  <span className="text-lg font-bold tracking-tight text-text">RockSpace</span>
                </div>
                <p className="text-sm text-text-muted leading-relaxed">
                  Three people. Three disciplines. One crash. Design, code, systems — from Bengaluru.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  {socials.map((s) => (
                    <button
                      key={s.label}
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-border/40 text-text-tertiary hover:text-text hover:border-border transition-all"
                      aria-label={s.label}
                    >
                      <s.icon className="w-3.5 h-3.5" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-1 gap-8 sm:gap-12 md:gap-16">
                {columns.map((col) => (
                  <div key={col.header} className="space-y-3">
                    <h4 className="text-[11px] font-mono tracking-[0.15em] uppercase text-text-tertiary">{col.header}</h4>
                    <ul className="space-y-2">
                      {col.links.map((link) => (
                        <li key={link}>
                          <a href="#" className="text-sm text-text-muted hover:text-text transition-colors">{link}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 pt-5 border-t border-border/20 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-text-tertiary">
              <p>© 2025 RockSpace. All rights reserved.</p>
              <div className="flex gap-4 items-center">
                <a href="#" className="hover:text-text transition-colors">Legal Center</a>
                <span className="opacity-30">/</span>
                <a href="#" className="hover:text-text transition-colors">User Agreement</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
