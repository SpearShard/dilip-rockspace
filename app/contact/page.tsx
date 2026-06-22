import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function Contact() {
  return (
    <>
      <Nav />
      <main className="min-h-dvh bg-bg flex items-center justify-center px-4">
        <div className="max-w-2xl text-center">
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-[700] tracking-[-0.03em] text-text leading-[1.1] mb-6">
            Contact<span className="text-accent">.</span>
          </h1>
          <p className="text-base sm:text-lg text-text-muted leading-relaxed mb-8">
            Got something worth building? Let&rsquo;s talk.
          </p>
          <a
            href="mailto:hello@rockspace.io"
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-3.5 bg-accent text-white text-base sm:text-lg font-semibold rounded-full hover:bg-accent/90 transition-all shadow-lg shadow-accent/25"
          >
            hello@rockspace.io
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
