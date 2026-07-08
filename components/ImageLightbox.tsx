'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ImageLightbox({ project, onClose }: { project: any; onClose: () => void }) {
  const allImages = [project.image, ...(project.images || [])];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIdx(p => (p + 1) % allImages.length);
      if (e.key === 'ArrowLeft') setIdx(p => (p - 1 + allImages.length) % allImages.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, allImages.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />
      
      <AnimatePresence mode="wait">
        <motion.img
          key={idx}
          src={allImages[idx]}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="max-w-[90vw] max-h-[80vh] object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      </AnimatePresence>

      {/* Navigation Indicators */}
      <div className="absolute bottom-10 flex gap-4">
        {allImages.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setIdx(i); }}
            className={`w-2 h-2 rounded-full transition-all ${i === idx ? 'bg-white w-8' : 'bg-white/20'}`}
          />
        ))}
      </div>
    </motion.div>
  );
}