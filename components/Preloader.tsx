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
      // Remove from DOM after animation completes
      setTimeout(() => {
        loader.remove()
        document.body.style.overflow = ''
      }, 700)
    }

    // MAX TIMEOUT: Never wait more than 10 seconds regardless of load state.
    // This prevents the loader from hanging forever if a resource (e.g. video) fails.
    const maxTimeout = setTimeout(dismiss, 10000)

    // Ideal case: wait for window.load (all resources fully loaded)
    if (document.readyState === 'complete') {
      clearTimeout(maxTimeout)
      setTimeout(dismiss, 500)
    } else {
      window.addEventListener('load', () => {
        clearTimeout(maxTimeout)
        setTimeout(dismiss, 500)
      })
    }

    return () => clearTimeout(maxTimeout)
  }, [])

  return null
}
