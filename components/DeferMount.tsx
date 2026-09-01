'use client'

import { useState, useEffect, ReactNode } from 'react'

/**
 * Defers the mounting of heavy components until after the initial paint.
 * This drastically improves Lighthouse performance (Total Blocking Time & LCP)
 * by yielding the main thread.
 */
export function DeferMount({ children, delay = 50 }: { children: ReactNode, delay?: number }) {
  const [shouldMount, setShouldMount] = useState(false)

  useEffect(() => {
    // Yield to the main thread so the browser can paint the initial frame
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        requestIdleCallback(() => setShouldMount(true))
      } else {
        setShouldMount(true)
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return shouldMount ? <>{children}</> : null
}
