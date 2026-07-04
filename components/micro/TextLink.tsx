import Link from 'next/link';
import { cn } from '@/lib/utils';
import { IconArrow } from '@/lib/icons';

export default function TextLink({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}) {
  const cls = cn('link-arrow group inline-flex items-center gap-2 font-medium text-sm', className);
  const content = (
    <>
      <span className="link-arrow-text">{children}</span>
      <IconArrow className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {content}
      </a>
    );
  }
  return <Link href={href} className={cls}>{content}</Link>;
}
