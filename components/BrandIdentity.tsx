"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  {
    title: "BRAND IDENTITY",
    layer: "LAYER_01",
    core: "M_CORE",
    ratio: "1.618 // PILL_SEGMENT_B",
    node: "INDEX_26",
    manifesto: "Exploded pill layout arrays framing negative geometry.",
    svgPath: "M0,10 Q25,0 50,10 T100,10",
    version: "V1.0.26"
  },
  {
    title: "WEB DEV",
    layer: "ENGINE_02",
    core: "DOM_V8",
    ratio: "NEXT_15 // RENDER_MATRIX_TS",
    node: "VITE_V6",
    manifesto: "High-end asynchronous server components with fluid interaction trees.",
    svgPath: "M0,5 L25,15 L50,5 L75,15 L100,5",
    version: "G_BUILD_7"
  },
  {
    title: "AI AUTOMATION",
    layer: "NEURAL_03",
    core: "LLM_INF",
    ratio: "TOK_SEC // VECTOR_STORE_DB",
    node: "CTX_128K",
    manifesto: "Autonomous multi-agent swarms syncing real-time pipeline operations.",
    svgPath: "M0,10 C30,20 40,0 60,10 T100,10",
    version: "A_AGENT_X"
  },
  {
    title: "MOTION 3D",
    layer: "RENDER_04",
    core: "WEBGL2",
    ratio: "60_FPS // SHADER_BUFFER_A",
    node: "R3F_GLSL",
    manifesto: "Raymarched procedural vertex grids mutating on mathematical scroll weights.",
    svgPath: "M0,20 L10,0 L30,20 L50,0 L70,20 L90,0 L100,20",
    version: "M_TICK_45"
  },
  {
    title: "PRODUCT STRATEGY",
    layer: "ALPHA_05",
    core: "GO_MARKET",
    ratio: "CAGR_42 // SYSTEMIC_SCALE",
    node: "VAL_PROP",
    manifesto: "Engineering unfair competitive advantages via clean architecture ecosystems.",
    svgPath: "M0,18 Q50,18 50,2 T50,2 L100,2",
    version: "S_EXEC_9"
  },
  {
    title: "NARRATIVES & DECKS",
    layer: "OMEGA_06",
    core: "PITCH_ST",
    ratio: "VIS_COMM // ARCHITECT_DECK",
    node: "FOUND_ST",
    manifesto: "Cinematic presentation blueprints crafted for premier high-end venture funds.",
    svgPath: "M0,10 H20 V2 H40 V18 H60 V2 H80 V18 H100",
    version: "D_FINAL_O"
  }
];

export default function BrandIdentity() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const domLayer = useRef<HTMLDivElement>(null);
  const domCore = useRef<HTMLDivElement>(null);
  const domRatio = useRef<HTMLSpanElement>(null);
  const domNode = useRef<HTMLDivElement>(null);
  const domManifesto = useRef<HTMLParagraphElement>(null);
  const domSvgPath = useRef<SVGPathElement>(null);
  const domVersion = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const triggerElement = triggerRef.current;
    const pinTarget = pinTargetRef.current;
    const container = containerRef.current;
    if (!triggerElement || !pinTarget || !container) return;

    const headingWrappers = container.querySelectorAll(".heading-wrapper");
    const capsules = container.querySelectorAll(".glass-capsule");

    // Explicit directional array coordinates for exploding elements into/out of view
    const spatialDirections = [
      { x: -260, y: -260 }, { x: 0, y: -300 }, { x: 260, y: -260 },
      { x: -340, y: 0 },                       { x: 340, y: 0 },
      { x: -260, y: 260 },  { x: 0, y: 300 },  { x: 260, y: 260 },
    ];

    // Set layout starting states (Scattered out in deep coordinate bounds)
    capsules.forEach((capsule, index) => {
      const dir = spatialDirections[index] || { x: 0, y: 0 };
      gsap.set(capsule, { x: dir.x, y: dir.y, scale: 0.7, opacity: 0 });
    });

    headingWrappers.forEach((wrapper) => {
      const chars = wrapper.querySelectorAll(".gsap-char");
      gsap.set(chars, { y: "115%" });
    });

    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: "top top",
        end: "bottom bottom",
        pin: pinTarget,
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    // ─── INTRO PHASE: Assemble from outside ───
    masterTimeline.to(capsules, {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 1.4,
      ease: "power4.out",
      stagger: 0.03
    }, 0);

    const initialChars = headingWrappers[0].querySelectorAll(".gsap-char");
    masterTimeline.to(initialChars, {
      y: "0%",
      duration: 1.1,
      ease: "power3.out",
      stagger: 0.02
    }, 0.4);

    // ─── MID PHASE: Step Sequential Slides ───
    const stepDuration = 2.0; 
    
    CHAPTERS.forEach((chapter, index) => {
      const timeAnchor = 1.4 + index * stepDuration;

      masterTimeline.add(() => {
        if (domLayer.current) domLayer.current.textContent = `[ ${chapter.layer} ]`;
        if (domCore.current) domCore.current.textContent = chapter.core;
        if (domRatio.current) domRatio.current.textContent = chapter.ratio;
        if (domNode.current) domNode.current.textContent = chapter.node;
        if (domManifesto.current) domManifesto.current.textContent = chapter.manifesto;
        if (domVersion.current) domVersion.current.textContent = chapter.version;
        if (domSvgPath.current) domSvgPath.current.setAttribute("d", chapter.svgPath);
      }, timeAnchor);

      // Handle the transition out to the next slice
      if (index < CHAPTERS.length - 1) {
        const currentHeadingChars = headingWrappers[index].querySelectorAll(".gsap-char");
        const nextHeadingChars = headingWrappers[index + 1].querySelectorAll(".gsap-char");

        masterTimeline.to(currentHeadingChars, {
          y: "-115%",
          duration: 0.6,
          ease: "power3.in",
          stagger: 0.01
        }, timeAnchor + 0.6);

        masterTimeline.to(capsules, {
          opacity: 0.35,
          scale: 0.94,
          duration: 0.5,
          ease: "power2.inOut",
          stagger: 0.012
        }, timeAnchor + 0.6);

        masterTimeline.to(capsules, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power3.out"
        }, timeAnchor + 1.2);

        masterTimeline.to(nextHeadingChars, {
          y: "0%",
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.015
        }, timeAnchor + 1.2);
      }
    });

    // ─── OUTRO PHASE: Blow blocks back out to the edges ───
    const finalSlideAnchor = 1.4 + (CHAPTERS.length - 1) * stepDuration;
    const exitTimeAnchor = finalSlideAnchor + 1.0; 
    const finalHeadingChars = headingWrappers[CHAPTERS.length - 1].querySelectorAll(".gsap-char");

    // Clean drop text away
    masterTimeline.to(finalHeadingChars, {
      y: "-115%",
      duration: 0.7,
      ease: "power3.in",
      stagger: 0.01
    }, exitTimeAnchor);

    // Map each block segment back out to its unique spatial perimeter target
    capsules.forEach((capsule, index) => {
      const dir = spatialDirections[index] || { x: 0, y: 0 };
      masterTimeline.to(capsule, {
        x: dir.x,
        y: dir.y,
        scale: 0.72,
        opacity: 0,
        duration: 1.2,
        ease: "power4.in",
      }, exitTimeAnchor + (index * 0.02)); // Subtle staggered cascade out
    });

    // Inertia Based Canvas Mouse Drift
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth - 0.5) * 20;
      mousePos.current.y = (e.clientY / window.innerHeight - 0.5) * 20;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const ticker = gsap.ticker.add(() => {
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * 0.08;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * 0.08;

      gsap.set(container, {
        x: currentPos.current.x,
        y: currentPos.current.y
      });
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      gsap.ticker.remove(ticker);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div 
      ref={triggerRef} 
      className="relative w-full " 
      style={{ height: `${(CHAPTERS.length + 1) * 120}vh` }} // Added extra track space window for the clean exit transition
    >
      <div 
        ref={pinTargetRef} 
        className="w-full h-screen overflow-hidden text-white flex items-center justify-center p-6 box-border select-none"
      >
        <div 
          ref={containerRef}
          className="w-full max-w-6xl h-[75vh] md:h-[65vh] grid grid-cols-4 md:grid-cols-12 grid-rows-6 md:grid-rows-3 gap-4 relative z-10"
          style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
        >
          
          {/* TOP LEFT FRAGMENT */}
          <div className="glass-capsule md:col-span-3 md:row-span-1 bg-white/[0.18] border border-white/30 p-6 flex flex-col justify-between rounded-[100px_20px_20px_20px] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.25)]">
            <div ref={domLayer} className="text-[9px] font-mono tracking-[0.3em] text-white/60 font-bold">[ LAYER_01 ]</div>
            <div ref={domCore} className="font-[dx] text-xl tracking-tight text-white drop-shadow-sm">M_CORE</div>
          </div>

          {/* TOP CENTER FRAGMENT */}
          <div className="glass-capsule md:col-span-6 md:row-span-1 bg-white/[0.18] border border-white/30 p-6 hidden md:flex items-center justify-between rounded-2xl shadow-[0_24px_50px_-12px_rgba(0,0,0,0.25)]">
            <span className="text-[9px] font-mono tracking-[0.3em] text-white/60 font-bold">[ MATRIX_RATIO ]</span>
            <span ref={domRatio} className="text-xs font-clean tracking-wider text-white font-medium drop-shadow-sm">1.618 // PILL_SEGMENT_B</span>
          </div>

          {/* TOP RIGHT FRAGMENT */}
          <div className="glass-capsule md:col-span-3 md:row-span-1 bg-white/[0.18] border border-white/30 p-6 flex flex-col justify-between text-right rounded-[20px_100px_20px_20px] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.25)]">
            <div className="text-[9px] font-mono tracking-[0.3em] text-white/60 font-bold">[ SYS_NODE ]</div>
            <div ref={domNode} className="font-[dx] text-lg tracking-tight text-white drop-shadow-sm">INDEX_26</div>
          </div>

          {/* MID LEFT FRAGMENT */}
          <div className="glass-capsule md:col-span-2 md:row-span-1 bg-white/[0.18] border border-white/30 p-6 hidden md:flex flex-col justify-between rounded-[20px_20px_20px_20px] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.25)]">
            <div className="text-[9px] font-mono tracking-[0.3em] text-white/60 font-bold">V_AXIS</div>
            <div className="text-[10px] font-mono text-white/50 font-medium">NODE_OK</div>
          </div>

          {/* CENTRAL TEXT EXCLUSION OVERLAY */}
          <div className="col-span-4 md:col-span-8 md:row-span-1 flex items-center justify-center relative p-4 overflow-visible">
            <div className="relative w-full h-full flex items-center justify-center overflow-visible">
              {CHAPTERS.map((chapter, index) => (
                <h2 
                  key={index}
                  className="heading-wrapper absolute font-[dx] text-[6.5vw] md:text-[4.5vw] text-white tracking-tighter m-0 whitespace-nowrap text-center mix-blend-difference drop-shadow-[0_10px_30px_rgba(0,0,0,0.15)] flex overflow-hidden select-none"
                >
                  {chapter.title.split("").map((char, charIdx) => (
                    <span key={charIdx} className="relative inline-block overflow-hidden">
                      <span className="gsap-char inline-block">
                        {char === " " ? "\u00A0" : char}
                      </span>
                    </span>
                  ))}
                </h2>
              ))}
            </div>
          </div>

          {/* MID RIGHT FRAGMENT */}
          <div className="glass-capsule md:col-span-2 md:row-span-1 bg-white/[0.18] border border-white/30 p-6 hidden md:flex flex-col justify-between text-right rounded-[20px_20px_20px_20px] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.25)]">
            <div className="text-[9px] font-mono tracking-[0.3em] text-white/60 font-bold">DIAG_VECTOR</div>
            <div className="text-[11px] font-mono text-white/50 font-medium">SYS_LIVE</div>
          </div>

          {/* BOTTOM LEFT FRAGMENT */}
          <div className="glass-capsule md:col-span-3 md:row-span-1 bg-white/[0.18] border border-white/30 p-6 flex flex-col justify-between rounded-[20px_20px_20px_100px] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.25)]">
            <div className="text-[9px] font-mono tracking-[0.3em] text-white/60 font-bold">[ SPEC_MANIFESTO ]</div>
            <p ref={domManifesto} className="font-clean text-[11px] leading-relaxed text-white m-0 max-w-[180px] font-medium drop-shadow-sm">
              Exploded pill layout arrays framing negative geometry.
            </p>
          </div>

          {/* BOTTOM CENTER FRAGMENT */}
          <div className="glass-capsule md:col-span-6 md:row-span-1 bg-white/[0.18] border border-white/30 p-6 hidden md:flex items-center justify-between rounded-2xl shadow-[0_24px_50px_-12px_rgba(0,0,0,0.25)]">
            <span className="text-[9px] font-mono tracking-[0.3em] text-white/60 font-bold">[ WAV_DESCRIPTOR ]</span>
            <svg className="w-48 h-6 stroke-white/50 fill-none dropped-shadow-sm" viewBox="0 0 100 20">
              <path ref={domSvgPath} d={CHAPTERS[0].svgPath} strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          </div>

          {/* BOTTOM RIGHT FRAGMENT */}
          <div className="glass-capsule md:col-span-3 md:row-span-1 bg-white/[0.18] border border-white/30 p-6 flex flex-col justify-between text-right rounded-[20px_20px_100px_20px] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.25)]">
            <div className="text-[9px] font-mono tracking-[0.3em] text-white/60 font-bold">[ VERSION ]</div>
            <div ref={domVersion} className="font-[dx] text-xl tracking-tight text-white/50 drop-shadow-sm">V1.0.26</div>
          </div>

        </div>

        <style>{`
          .glass-capsule {
            position: relative;
            backdrop-filter: blur(40px);
            -webkit-backdrop-filter: blur(40px);
            overflow: hidden;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            transform-style: preserve-3d;
            transition: background-color 0.3s ease;
          }
          .glass-capsule:hover {
            background-color: rgba(255, 255, 255, 0.25);
          }
          .glass-capsule::before {
            content: '';
            position: absolute;
            inset: 0;
            opacity: 0.06;
            mix-blend-mode: overlay;
            pointer-events: none;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          }
        `}</style>
      </div>
    </div>
  );
}