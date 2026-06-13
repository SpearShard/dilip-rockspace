'use client';

import Link from 'next/link';

export default function DesignerPlaceholder() {
  return (
    <main className="min-h-dvh bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-text-tertiary mb-4">
          ROCKSPACE · DESIGN LEAD
        </p>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-[700] tracking-[-0.03em] text-text leading-tight mb-4">
          Coming soon
        </h1>
        <p className="text-sm sm:text-base text-text-muted leading-relaxed mb-8">
          The lead designer&apos;s perspective is still taking shape. Check back soon for a fresh lens on the studio.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white text-sm font-semibold rounded-full hover:bg-accent/90 transition-all shadow-lg shadow-accent/20"
        >
          Back to perspectives
        </Link>
      </div>
    </main>
  );
}
