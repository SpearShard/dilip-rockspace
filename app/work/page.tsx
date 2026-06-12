import Nav from '@/components/Nav';
import DomeGallery from '@/components/DomeGallery';

export default function WorkPage() {
  return (
    <>
      <Nav />
      <main className="relative w-full h-screen overflow-hidden bg-bg">
        <DomeGallery />

        <div className="absolute top-28 left-8 md:left-12 z-10 pointer-events-none">
          <p className="text-sm text-accent-dark tracking-[0.2em] uppercase flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-accent-dark/40" />
            <span className="font-hand text-base lowercase tracking-normal">our</span>
            <span className="font-mono">work</span>
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em] text-text">
            <span className="text-shimmer">Dome</span><span className="text-accent">.</span>
          </h1>
          <p className="text-sm text-text-muted mt-3 font-mono max-w-xs">
            Drag to explore
          </p>
        </div>
      </main>
    </>
  );
}
