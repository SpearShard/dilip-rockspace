'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

interface SplitTextProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  delay?: number
  stagger?: number
  threshold?: number
}

export default function SplitText({
  text,
  className = '',
  as: Tag = 'p',
  delay = 0,
  stagger = 0.04,
  threshold = 0.2
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null)

  const chars = text.split('').map((char) => {
    if (char === ' ') return '\u00A0'
    return char
  })

  useGSAP(() => {
    if (!ref.current) return
    const spans = ref.current.querySelectorAll('.split-char')
    if (!spans.length) return

    gsap.fromTo(
      spans,
      { opacity: 0, y: 40, rotateX: -90 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger,
        delay,
        scrollTrigger: {
          trigger: ref.current,
          start: `top ${(1 - threshold) * 100}%`,
          once: true,
          fastScrollEnd: true,
          anticipatePin: 0.4
        }
      }
    )
  }, { dependencies: [text, delay, stagger, threshold], scope: ref })

  return (
    <Tag className={`inline ${className}`} style={{ perspective: '800px' }}>
      <span ref={ref}>
        {chars.map((char, i) => (
          <span
            key={i}
            className="split-char inline-block"
            style={{ willChange: 'transform, opacity' }}
          >
            {char}
          </span>
        ))}
      </span>
    </Tag>
  )
}
