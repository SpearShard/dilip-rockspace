'use client';

import { cn } from '@/lib/utils';

export default function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <span className="micro-dot" aria-hidden />
      <span className="section-eyebrow !mb-0">{children}</span>
    </div>
  );
}
