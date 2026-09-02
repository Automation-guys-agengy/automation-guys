'use client'

import { useEffect } from 'react'

export function PreloaderDismiss() {
  useEffect(() => {
    const loader = document.getElementById('preloader')
    if (!loader) return

    let dismissed = false

    const dismiss = () => {
      if (dismissed) return
      dismissed = true
      // Add exit animation class
      loader.classList.add('preloader-exit')
      // Hide from DOM after animation completes instead of removing
      // to prevent React hydration errors (NotFoundError: Failed to execute 'removeChild')
      setTimeout(() => {
        loader.style.display = 'none'
        document.body.style.overflow = ''
      }, 700)
    }

    // MAX TIMEOUT: Never wait more than 10 seconds regardless of load state.
    // This prevents the loader from hanging forever if a resource (e.g. video) fails.
    const maxTimeout = setTimeout(dismiss, 10000)

    // Ideal case: wait for window.load (all resources fully loaded)
    if (document.readyState === 'complete') {
      clearTimeout(maxTimeout)
      setTimeout(dismiss, 2000)
    } else {
      window.addEventListener('load', () => {
        clearTimeout(maxTimeout)
        // Give a generous 2s buffer after load to completely hide the massive 
        // JS hydration freeze (Three.js WebGL compile, GSAP initialization, etc)
        setTimeout(dismiss, 2000)
      })
    }

    return () => clearTimeout(maxTimeout)
  }, [])

  return null
}

