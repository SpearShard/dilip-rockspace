'use client';

import Image from 'next/image';
import { Globe, MessageCircle, AtSign } from 'lucide-react';

const socials = [
  { icon: Globe, label: 'Globe' },
  { icon: MessageCircle, label: 'Message' },
  { icon: AtSign, label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="w-full mt-12 md:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative max-w-5xl mx-auto">
          <div className="border-t border-border/30 pt-10 pb-8">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="flex items-center gap-2">
                <div className="relative w-7 h-7 opacity-40 brightness-0">
                  <Image
                    src="/Vector 2173.png"
                    alt=""
                    fill
                    className="object-contain"
                    sizes="28px"
                  />
                </div>
                <span className="text-lg font-bold tracking-tight text-text">RockSpace</span>
              </div>
              <p className="text-sm text-text-muted leading-relaxed max-w-sm">
                Three people. Three disciplines. One outcome. Design, code and systems.
              </p>
              <div className="flex items-center gap-2">
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
