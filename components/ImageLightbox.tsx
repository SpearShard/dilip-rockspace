'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ImageLightbox({ project, onClose }: { project: any; onClose: () => void }) {
  const allImages = [project.image, ...(project.images || [])];
  const [idx, setIdx] = useState(0);
  const [imgError, setImgError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIdx(0);
    setImgError(false);
  }, [project]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIdx((p) => (p + 1) % allImages.length);
      if (e.key === 'ArrowLeft')
        setIdx((p) => (p - 1 + allImages.length) % allImages.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, allImages.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />

      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
        aria-label="Close"
      >
        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Prev arrow */}
      {allImages.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIdx((p) => (p - 1 + allImages.length) % allImages.length);
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          aria-label="Previous"
        >
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}

      {/* Next arrow */}
      {allImages.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIdx((p) => (p + 1) % allImages.length);
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          aria-label="Next"
        >
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}

      {/* Image container with fixed dimensions */}
      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-4xl aspect-[16/10] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          {!imgError && (
            <motion.img
              key={idx}
              src={allImages[idx]}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-contain"
              onError={() => setImgError(true)}
            />
          )}
          {imgError && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-2 text-white/40"
            >
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              <span className="text-sm font-mono">Could not load image</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation dots */}
      {allImages.length > 1 && (
        <div className="relative z-10 mt-6 flex gap-3">
          {allImages.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setIdx(i);
              }}
              className={`h-2 rounded-full transition-all ${
                i === idx ? 'bg-white w-8' : 'bg-white/20 w-2'
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
