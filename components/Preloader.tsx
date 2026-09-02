'use client'

import { useEffect, useRef, useState } from 'react'

/* ─────────────────────────────────────────────────────────────────────────
   PreloaderDismiss — Client component that drives the cinematic preloader.

   Progress milestones (cumulative %):
     10%  — script parsed / component mounted
     40%  — DOMContentLoaded
     80%  — window.load
     90%  — 500 ms after load (hydration / WebGL settle)
    100%  — countdown complete → reveal starts
   ───────────────────────────────────────────────────────────────────────── */



export function PreloaderDismiss() {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'intro' | 'loading' | 'done'>('intro')
  const dismissedRef = useRef(false)

  useEffect(() => {
    const loader = document.getElementById('preloader')
    if (!loader) return

    // ── Smooth progress tweening ──────────────────────────────────────────
    let current = 0
    let target = 10 // mount milestone
    let rafId: number
    let active = true

    const tick = () => {
      if (!active) return
      const diff = target - current
      if (Math.abs(diff) > 0.15) {
        current += diff * 0.045
        setProgress(Math.round(current))
      } else {
        current = target
        setProgress(target)
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    const advanceTo = (pct: number) => {
      target = Math.max(target, pct)
    }

    // ── Intro phase → loading phase transition ────────────────────────────
    const introTimer = setTimeout(() => setPhase('loading'), 600)

    // ── DOM ready ─────────────────────────────────────────────────────────
    if (document.readyState !== 'loading') {
      advanceTo(40)
    } else {
      document.addEventListener('DOMContentLoaded', () => advanceTo(40), { once: true })
    }

    // ── Window fully loaded ───────────────────────────────────────────────
    const onLoad = () => {
      advanceTo(80)
      // Give 1s for hydration / shader compile before jumping to 90%
      setTimeout(() => advanceTo(90), 1000)
    }

    if (document.readyState === 'complete') {
      onLoad()
    } else {
      window.addEventListener('load', onLoad, { once: true })
    }

    // ── Drive to 100 % then dismiss ───────────────────────────────────────
    const dismiss = () => {
      if (dismissedRef.current) return
      dismissedRef.current = true

      advanceTo(100)
      // Wait for bar to visually fill, then reveal
      setTimeout(() => {
        setPhase('done')
        // After exit animation completes, hide the loader
        setTimeout(() => {
          loader.style.display = 'none'
          document.body.style.overflow = ''
        }, 900)
      }, 400)
    }

    // Dismiss 2 s after load — gives the page time to settle visually
    const loadDismissTimer = (() => {
      let t: ReturnType<typeof setTimeout>
      const schedule = () => { t = setTimeout(dismiss, 2000) }
      if (document.readyState === 'complete') {
        schedule()
      } else {
        window.addEventListener('load', schedule, { once: true })
      }
      return { clear: () => clearTimeout(t) }
    })()

    // Hard cap: never hang > 9 seconds
    const hardCap = setTimeout(dismiss, 9000)

    return () => {
      active = false
      cancelAnimationFrame(rafId)
      clearTimeout(introTimer)
      clearTimeout(hardCap)
      loadDismissTimer.clear()
    }
  }, [])

  // ── Render nothing — the preloader is pure HTML injected in layout ──────
  // We drive it by mutating CSS custom properties on the #preloader element
  useEffect(() => {
    const loader = document.getElementById('preloader')
    if (!loader) return

    // Drive the CSS-var-controlled progress bar
    loader.style.setProperty('--pl-progress', `${progress}%`)

    // Update the visible percentage counter
    const pctEl = document.getElementById('pl-pct-display')
    if (pctEl) pctEl.textContent = `${progress}%`

    // Update aria-valuenow for screen readers
    loader.setAttribute('aria-valuenow', String(progress))

    // Phase classes
    if (phase === 'loading') {
      loader.classList.add('pl-phase-loading')
    }
    if (phase === 'done') {
      loader.classList.add('pl-phase-done')
    }
  }, [progress, phase])

  return null
}
