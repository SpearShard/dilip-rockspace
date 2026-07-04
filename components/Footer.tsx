'use client';

import Link from 'next/link';
import { Camera, Link2, Mail } from 'lucide-react';

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/rockspace.in/', icon: Camera },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/rkspace/posts/?feedView=all', icon: Link2 },
  { label: 'Email', href: 'mailto:hello@rockspace.io', icon: Mail },
];

export default function Footer() {
  return (
    <footer className="pb-8 pt-2 sm:pb-10">
      <div className="section-shell">
        <div className="rounded-[2rem] border border-black/5 bg-white/70 p-6 shadow-[0_16px_60px_rgba(23,18,15,0.05)] sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-500">RockSpace</p>
              <p className="mt-2 max-w-xl text-base leading-7 text-stone-600">
                Quietly ambitious work for founders who want their brand and product to feel unmistakably premium.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {socials.map((item) => {
                const Icon = item.icon;
                return (
                  <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-medium text-stone-700 transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md hover:border-stone-300">
                    <Icon className="h-4 w-4 text-stone-500 transition group-hover:text-stone-700" />
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-3 border-t border-black/5 pt-6 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 RockSpace. Crafted with intention.</p>
            <div className="flex gap-4">
              <Link href="/about" className="transition hover:text-stone-900">About</Link>
              <Link href="/work" className="transition hover:text-stone-900">Work</Link>
              <Link href="/contact" className="transition hover:text-stone-900">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
