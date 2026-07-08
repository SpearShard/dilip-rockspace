'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  image: string;
  url?: string;
  month: string;
  year: string;
}

export default function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
      
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
        >
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>

        <div className="p-8 sm:p-12">
          <div className="mb-8">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40">{project.category}</span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter text-white mt-4">{project.title}</h2>
            <p className="text-xl text-white/60 mt-2">{project.subtitle}</p>
          </div>

          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#111] mb-8">
            <Image src={project.image} alt={project.title} fill className="object-cover" />
          </div>

          <p className="text-lg text-white/70 leading-relaxed max-w-2xl mb-10">
            {project.description}
          </p>

          {project.url && (
            <a href={project.url} target="_blank" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold text-sm rounded-full hover:bg-white/90 transition-colors">
              Visit Live Project
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}