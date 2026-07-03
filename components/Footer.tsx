'use client';

import Link from 'next/link';
import { siteConfig } from '@/lib/projectData';

const links = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-[#22C55E]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <span className="font-display font-bold-ui text-lg tracking-[-0.03em] text-white">
            RockSpace
          </span>
          <nav className="flex items-center gap-5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium-ui text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 pt-6 border-t border-white/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-white/60">
            &copy; {new Date().getFullYear()} {siteConfig.location}
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            {siteConfig.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
