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

    // With progressive loading, the initial paint is fast.
    // Dismiss once the DOM is interactive (no need to wait for full load).
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      requestAnimationFrame(() => setTimeout(dismiss, 200))
    } else {
      const onReady = () => {
        requestAnimationFrame(() => setTimeout(dismiss, 200))
      }
      document.addEventListener('DOMContentLoaded', onReady)
      return () => document.removeEventListener('DOMContentLoaded', onReady)
    }
  }, [])

  return null
}
