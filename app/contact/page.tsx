import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function Contact() {
  return (
    <>
      <Nav />
      <main className="min-h-dvh bg-bg relative">
        <Link
          href="/"
          className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10 w-10 h-8 sm:w-12 sm:h-[38px] cursor-pointer"
          aria-label="Go home"
        >
          <Image
            src="/Vector 2173.png"
            alt=""
            fill
            className="object-contain object-left-top brightness-0 opacity-30 hover:opacity-50 transition-opacity duration-200"
            sizes="48px"
          />
        </Link>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-20">
          <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
            <p className="font-hand text-lg sm:text-xl text-accent/70 mb-2 tracking-wide">
              Get in touch
            </p>
            <h1 className="font-display font-[700] text-[clamp(2.8rem,7vw,5rem)] tracking-[-0.03em] text-text leading-[1.05] mb-5">
              Let&rsquo;s build<span className="text-accent">.</span>
            </h1>
            <p className="text-base sm:text-lg text-text-muted leading-relaxed max-w-lg mx-auto mb-8">
              Got a project, a pitch, or just a wild idea? We&rsquo;re always up for a conversation.
            </p>
            <a
              href="mailto:dilipseervi2308@gmail.com"
              className="inline-flex items-center gap-2 px-8 sm:px-10 py-3.5 sm:py-4 bg-accent text-white text-base sm:text-lg font-bold rounded-full hover:bg-accent/90 transition-all shadow-lg shadow-accent/25 hover:shadow-accent/35 hover:-translate-y-0.5 active:translate-y-0"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-10 7L2 7" />
              </svg>
              dilipseervi2308@gmail.com
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
