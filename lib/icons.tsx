import { cn } from '@/lib/utils';

type IconProps = { className?: string };

export function IconArrow({ className }: IconProps) {
  return (
    <svg className={cn('size-4', className)} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconArrowUpRight({ className }: IconProps) {
  return (
    <svg className={cn('size-4', className)} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M6 14L14 6M8 6h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconSpark({ className }: IconProps) {
  return (
    <svg className={cn('size-4', className)} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M10 2v4M10 14v4M2 10h4M14 10h4M4.93 4.93l2.83 2.83M12.24 12.24l2.83 2.83M4.93 15.07l2.83-2.83M12.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

export function IconMail({ className }: IconProps) {
  return (
    <svg className={cn('size-4', className)} viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M3 6l7 5 7-5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

export function IconInstagram({ className }: IconProps) {
  return (
    <svg className={cn('size-4', className)} viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="3" y="3" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="14.5" cy="5.5" r="0.75" fill="currentColor" />
    </svg>
  );
}

export function IconLinkedIn({ className }: IconProps) {
  return (
    <svg className={cn('size-4', className)} viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.25" />
      <path d="M6.5 9v5M6.5 6.5v.01M10 14V11c0-1 .8-1.5 1.5-1.5S13 10 13 11v3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

export function IconPlay({ className }: IconProps) {
  return (
    <svg className={cn('size-3.5', className)} viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M5 3.5l8 4.5-8 4.5V3.5z" />
    </svg>
  );
}

export function IconClose({ className }: IconProps) {
  return (
    <svg className={cn('size-4', className)} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconExpand({ className }: IconProps) {
  return (
    <svg className={cn('size-4', className)} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M7 3H3v4M13 3h4v4M13 17h4v-4M7 17H3v-4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}


