import Link from 'next/link';
import Image from 'next/image';

export default function BackHome({ className = '' }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`absolute top-6 sm:top-8 left-6 sm:left-10 z-10 w-10 h-8 sm:w-12 sm:h-[38px] group ${className}`}
      aria-label="Go home"
    >
      <Image
        src="/Vector 2173.png"
        alt=""
        fill
        className="object-contain object-left-top brightness-0 opacity-30 group-hover:opacity-55 transition-all duration-300 group-hover:scale-105"
        sizes="48px"
      />
    </Link>
  );
}
