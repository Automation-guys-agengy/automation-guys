'use client'

import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  r: number
  alpha: number
  speed: number   // twinkle speed (radians per frame)
  phase: number   // current phase offset
}

interface Props {
  count?: number
  className?: string
}

/**
 * StarField — ultra-lightweight canvas star background.
 * Renders N stars that gently twinkle. No WebGL, no Three.js, no shaders.
 * Runs entirely on a 2D canvas with requestAnimationFrame.
 */
export function StarField({ count = 220, className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let stars: Star[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      spawn()
    }

    const spawn = () => {
      const w = canvas.width
      const h = canvas.height
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + 0.3,           // 0.3–1.5 px
        alpha: Math.random() * 0.5 + 0.15,       // base opacity 0.15–0.65
        speed: Math.random() * 0.012 + 0.004,    // slow twinkle
        phase: Math.random() * Math.PI * 2,
      }))
    }

    const draw = () => {
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      for (const s of stars) {
        // Sinusoidal twinkle: oscillate alpha between (base - amp) and (base + amp)
        s.phase += s.speed
        const amp = s.alpha * 0.55
        const currentAlpha = s.alpha + Math.sin(s.phase) * amp

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, Math.min(1, currentAlpha))})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    // Observe size changes (handles SSR + resize)
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()
    draw()

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [count])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  )
}
