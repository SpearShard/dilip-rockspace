'use client'

import { useRef, useEffect } from 'react'

export default function BackgroundBeams({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2
      canvas.height = canvas.offsetHeight * 2
    }
    resize()
    window.addEventListener('resize', resize)

    const beams: { x: number; y: number; vx: number; vy: number; hue: number }[] = []
    for (let i = 0; i < 8; i++) {
      beams.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        hue: 260 + Math.random() * 40
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      beams.forEach((b, i) => {
        b.x += b.vx
        b.y += b.vy

        if (b.x < 0 || b.x > canvas.width) b.vx *= -1
        if (b.y < 0 || b.y > canvas.height) b.vy *= -1

        beams.forEach((other, j) => {
          if (i >= j) return
          const dx = b.x - other.x
          const dy = b.y - other.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 300) {
            ctx.beginPath()
            ctx.moveTo(b.x, b.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = `hsla(${b.hue}, 70%, 70%, ${0.08 * (1 - dist / 300)})`
            ctx.lineWidth = 1.5
            ctx.stroke()
          }
        })

        ctx.beginPath()
        ctx.arc(b.x, b.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${b.hue}, 70%, 70%, 0.4)`
        ctx.fill()
      })

      animationId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 -z-0 ${className || ''}`}
      aria-hidden
    />
  )
}
