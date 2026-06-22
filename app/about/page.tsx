import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function About() {
  return (
    <>
      <Nav />
      <main className="min-h-dvh bg-bg flex items-center justify-center px-4">
        <div className="max-w-2xl text-center">
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-[700] tracking-[-0.03em] text-text leading-[1.1] mb-6">
            About<span className="text-accent">.</span>
          </h1>
          <p className="text-base sm:text-lg text-text-muted leading-relaxed">
            Three people. Three disciplines. One purpose. Design, code and systems from Bengaluru.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
