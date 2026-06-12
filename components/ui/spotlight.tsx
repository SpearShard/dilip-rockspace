'use client'

import { useRef, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export default function Spotlight({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)
  const isTouch = useRef(false)

  useEffect(() => {
    isTouch.current = 'ontouchstart' in window
  }, [])

  const handleMouse = (e: React.MouseEvent) => {
    if (isTouch.current) return
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouse}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={cn('relative overflow-hidden', className)}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-0 transition-opacity duration-500"
        style={{ opacity }}
        aria-hidden
      >
        <div
          className="absolute h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[100px]"
          style={{ left: position.x, top: position.y }}
        />
        <div
          className="absolute h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-warm/10 blur-[80px]"
          style={{ left: position.x + 40, top: position.y + 40 }}
        />
      </div>
      {children}
    </div>
  )
}
