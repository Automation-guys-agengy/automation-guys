'use client'

import { useEffect } from 'react'

export function PreloaderDismiss() {
  useEffect(() => {
    const loader = document.getElementById('preloader')
    if (!loader) return

    const dismiss = () => {
      loader.classList.add('preloader-exit')
      setTimeout(() => {
        loader.remove()
        document.body.style.overflow = ''
      }, 700)
    }

    // Wait for full page load, then dismiss
    if (document.readyState === 'complete') {
      // Small delay so it doesn't flash away instantly on cache hits
      setTimeout(dismiss, 400)
    } else {
      window.addEventListener('load', () => setTimeout(dismiss, 300))
    }
  }, [])

  return null
}
