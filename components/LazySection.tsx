'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

interface LazySectionProps {
  children: ReactNode
  /** How many pixels before the section enters the viewport to start loading */
  rootMargin?: string
  /** Minimum height placeholder to prevent layout shift */
  minHeight?: string
  /** Optional className for the wrapper */
  className?: string
}

/**
 * Wraps a section so it only mounts when the user scrolls near it.
 * Uses IntersectionObserver — zero dependencies, no JS framework overhead.
 * Once visible, stays mounted permanently (no unmounting on scroll away).
 */
export function LazySection({
  children,
  rootMargin = '600px',
  minHeight = '200px',
  className,
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return (
    <div ref={ref} className={className} style={{ minHeight: isVisible ? undefined : minHeight }}>
      {isVisible ? children : null}
    </div>
  )
}
