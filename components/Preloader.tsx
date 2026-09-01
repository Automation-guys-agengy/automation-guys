'use client'

import { useEffect } from 'react'

export function PreloaderDismiss() {
  useEffect(() => {
    const loader = document.getElementById('preloader')
    if (!loader) return

    const dismiss = () => {
      // Add exit animation class
      loader.classList.add('preloader-exit')
      // Remove from DOM after animation completes
      setTimeout(() => {
        loader.remove()
        document.body.style.overflow = ''
      }, 700)
    }

    // Wait for window.load — fires ONLY after ALL resources are fully loaded
    // (all images, fonts, scripts, iframes, stylesheets, etc.)
    if (document.readyState === 'complete') {
      // Already loaded (e.g. client-side navigation), small delay for polish
      setTimeout(dismiss, 500)
    } else {
      window.addEventListener('load', () => {
        // Give a tiny extra buffer for dynamic components to finish rendering
        setTimeout(dismiss, 500)
      })
    }
  }, [])

  return null
}
