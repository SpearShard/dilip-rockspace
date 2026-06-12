'use client';

import { useEffect, useMemo, useRef, useCallback, useState } from 'react';
import { useGesture } from '@use-gesture/react';
import Image from 'next/image';
import { projects } from '@/lib/projectData';
import './DomeGallery.css';

const COLORS: Record<string, string> = {
  WEB: '#A78BFA', MOTION: '#FF8A65', '3D': '#7C3AED',
  BRAND: '#C084FC', DATA: '#DDD6FE', VR: '#F472B6',
};

const PNG_POOL = [
  '/rockspace.png', '/fulllogo.png',
  '/debasispfp.png', '/jayadityapfp.png', '/dilippfp.png',
];

const LATS = [-60, -40, -20, 0, 20, 40, 60];
const LONGS_EVEN = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
const LONGS_ODD = [15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345];

const clamp = (v: number, mn: number, mx: number) => Math.min(Math.max(v, mn), mx);
const wrap = (d: number) => { const a = ((d + 180) % 360 + 360) % 360; return a - 180; };

function pickImages() {
  return [...PNG_POOL].sort(() => Math.random() - 0.5).slice(0, 2);
}

function buildItems() {
  const cards: { lat: number; lon: number; project: typeof projects[0] }[] = [];
  let idx = 0;
  for (let ri = 0; ri < LATS.length; ri++) {
    const lons = ri % 2 === 0 ? LONGS_EVEN : LONGS_ODD;
    for (const lon of lons) {
      cards.push({ lat: LATS[ri], lon, project: projects[idx % projects.length] });
      idx++;
    }
  }
  return cards;
}

function DetailCard({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  const color = COLORS[project.category] || '#A78BFA';
  const [imgs] = useState(pickImages);
  return (
    <div className="dg-detail__card" onClick={(e) => e.stopPropagation()}>
      <div className="dg-detail__images">
        {imgs.map((src, i) => (
          <div key={i} className="dg-detail__img-wrap">
            <Image src={src} alt="" width={300} height={300} className="dg-detail__img" />
          </div>
        ))}
      </div>
      <div className="dg-detail__body">
        <div className="dg-detail__pre">
          <span className="dg-detail__dot" style={{ backgroundColor: color }} />
          <span className="dg-detail__cat" style={{ color }}>{project.category}</span>
          <span className="dg-detail__id">{project.id}</span>
        </div>
        <h2 className="dg-detail__title">{project.title}</h2>
        <p className="dg-detail__sub">{project.subtitle}</p>
        <p className="dg-detail__desc">{project.description}</p>
      </div>
      <button className="dg-detail__close" onClick={onClose}>×</button>
    </div>
  );
}

export default function DomeGallery() {
  const rootRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);
  const [detailKey, setDetailKey] = useState(0);
  const [entered, setEntered] = useState(false);
  const rotRef = useRef({ x: 0, y: 0 });
  const startRot = useRef({ x: 0, y: 0 });
  const startPos = useRef<{ x: number; y: number } | null>(null);
  const dragging = useRef(false);
  const moved = useRef(false);
  const inRAF = useRef<number | null>(null);
  const lastEnd = useRef(0);
  const scrollAccum = useRef(0);

  const cards = useMemo(() => buildItems(), []);

  const apply = useCallback(() => {
    const el = globeRef.current;
    if (el) {
      el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${rotRef.current.x}deg) rotateY(${rotRef.current.y}deg)`;
    }
  }, []);

  const stopIn = useCallback(() => {
    if (inRAF.current !== null) { cancelAnimationFrame(inRAF.current); inRAF.current = null; }
  }, []);

  const autoRotate = useRef(true);

  const startIn = useCallback((vx: number, vy: number) => {
    let vX = clamp(vx, -1.4, 1.4) * 80;
    let vY = clamp(vy, -1.4, 1.4) * 80;
    let f = 0;
    const step = () => {
      vX *= 0.97; vY *= 0.97;
      if ((Math.abs(vX) < 0.01 && Math.abs(vY) < 0.01) || ++f > 180) { inRAF.current = null; autoRotate.current = true; return; }
      rotRef.current = { x: clamp(rotRef.current.x - vY / 200, -5, 5), y: wrap(rotRef.current.y + vX / 200) };
      apply();
      inRAF.current = requestAnimationFrame(step);
    };
    stopIn();
    autoRotate.current = false;
    inRAF.current = requestAnimationFrame(step);
  }, [stopIn, apply]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const onWheel = (e: WheelEvent) => {
      if (selected) return;
      e.preventDefault();
      scrollAccum.current += e.deltaY * 0.04;
      const delta = scrollAccum.current;
      scrollAccum.current = 0;
      stopIn();
      autoRotate.current = false;
      rotRef.current = { x: rotRef.current.x, y: wrap(rotRef.current.y + delta) };
      apply();
      const v = clamp(delta * 1.5, -2, 2);
      if (Math.abs(v) > 0.01) startIn(v * 0.3, 0);
    };
    root.addEventListener('wheel', onWheel, { passive: false });
    return () => root.removeEventListener('wheel', onWheel);
  }, [selected, apply, stopIn, startIn]);

  useEffect(() => {
    let id: number;
    const step = () => {
      if (autoRotate.current && !selected && !dragging.current) {
        rotRef.current = { x: rotRef.current.x, y: wrap(rotRef.current.y + 0.05) };
        apply();
      }
      id = requestAnimationFrame(step);
    };
    id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [selected, apply]);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => { apply(); }, [apply]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver(entries => {
      const { width: w, height: h } = entries[0].contentRect;
      const diag = Math.round(Math.sqrt(w * w + h * h));
      const radius = Math.round(diag * 0.52);
      root.style.setProperty('--radius', `${radius}px`);
      root.style.setProperty('--perspective', `${Math.round(radius * 2.4)}px`);
      apply();
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [apply]);

  useGesture(
    {
      onDragStart: () => {
        if (selected) return;
        stopIn();
        dragging.current = true; moved.current = false;
        startRot.current = { ...rotRef.current };
        startPos.current = null;
      },
      onDrag: ({ event, last, velocity: [vx, vy], direction: [dx, dy], movement: [mx, my] }) => {
        if (selected || !dragging.current) return;
        const e = event as PointerEvent;
        if (!startPos.current) startPos.current = { x: e.clientX, y: e.clientY };
        const dxT = e.clientX - startPos.current.x;
        const dyT = e.clientY - startPos.current.y;
        if (!moved.current && dxT * dxT + dyT * dyT > 16) moved.current = true;
        rotRef.current = {
          x: clamp(startRot.current.x - dyT / 15, -8, 8),
          y: wrap(startRot.current.y + dxT / 15),
        };
        apply();
        if (last) {
          dragging.current = false;
          let vX = vx * dx;
          let vY = vy * dy;
          if (Math.abs(vX) < 0.001 && Math.abs(vY) < 0.001) {
            vX = clamp((mx / 15) * 0.02, -1.2, 1.2);
            vY = clamp((my / 15) * 0.02, -1.2, 1.2);
          }
          if (Math.abs(vX) > 0.005 || Math.abs(vY) > 0.005) startIn(vX, vY);
          if (moved.current) lastEnd.current = performance.now();
          moved.current = false;
        }
      },
    },
    { target: rootRef, eventOptions: { passive: true } },
  );

  const open = useCallback((p: typeof projects[0]) => {
    setSelected(p);
    setDetailKey(n => n + 1);
    document.body.classList.add('dg-scroll-lock');
  }, []);

  const close = useCallback(() => {
    setSelected(null);
    document.body.classList.remove('dg-scroll-lock');
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  useEffect(() => {
    return () => { document.body.classList.remove('dg-scroll-lock'); };
  }, []);

  const onCardClick = useCallback((e: React.MouseEvent, p: typeof projects[0]) => {
    if (moved.current || dragging.current) return;
    if (performance.now() - lastEnd.current < 80) return;
    e.stopPropagation();
    open(p);
  }, [open]);

  return (
    <div ref={rootRef} className={`dg-root${entered ? ' dg-root--entered' : ''}`}>
      <div className="dg-deco-logos" aria-hidden>
        <Image src="/rockspace.png" alt="" width={48} height={48} className="dg-logo dg-logo--1" />
        <Image src="/fulllogo.png" alt="" width={32} height={32} className="dg-logo dg-logo--2" />
        <Image src="/rockspace.png" alt="" width={56} height={56} className="dg-logo dg-logo--3" />
        <Image src="/debasispfp.png" alt="" width={24} height={24} className="dg-logo dg-logo--4" />
        <Image src="/rockspace.png" alt="" width={40} height={40} className="dg-logo dg-logo--5" />
        <Image src="/dilippfp.png" alt="" width={18} height={18} className="dg-logo dg-logo--6" />
      </div>

      <div className="dg-stage">
        <div ref={globeRef} className="dg-globe">
          <div className="dg-globe-glow" />
          <div className="dg-ring dg-ring--equator" />
          <div className="dg-ring dg-ring--meridian1" />
          <div className="dg-ring dg-ring--meridian2" />
          <div className="dg-ring dg-ring--meridian3" />
          <div className="dg-ring dg-ring--lat1" />
          <div className="dg-ring dg-ring--lat2" />
          <div className="dg-ring dg-ring--lat3" />
          <div className="dg-ring dg-ring--lat4" />

          {cards.map((c, i) => {
            const color = COLORS[c.project.category] || '#A78BFA';
            return (
              <div
                key={`c-${i}`}
                className="dg-card"
                style={{
                  '--rotY': `${c.lon}deg`,
                  '--rotX': `${-c.lat}deg`,
                } as React.CSSProperties}
                onClick={(e) => onCardClick(e, c.project)}
              >
                <div className="dg-card__inner">
                  <div className="dg-card__dot" style={{ backgroundColor: color }} />
                  <span className="dg-card__cat" style={{ color }}>{c.project.category}</span>
                  <h3 className="dg-card__title">{c.project.title}</h3>
                  <p className="dg-card__sub">{c.project.subtitle}</p>
                  <p className="dg-card__desc">{c.project.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="dg-overlay-vignette" />
      <p className="dg-hint">drag · scroll · click</p>

      <div className={`dg-detail${selected ? ' dg-detail--open' : ''}`} onClick={close}>
        <div className="dg-detail__scrim" />
        {selected && <DetailCard key={`${selected.id}-${detailKey}`} project={selected} onClose={close} />}
      </div>
    </div>
  );
}
