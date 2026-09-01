'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden'

    const MIN_LOADING_TIME = 2200
    const startTime = Date.now()
    
    const finishLoading = () => {
      const elapsedTime = Date.now() - startTime
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime)
      
      setTimeout(() => {
        setIsLoading(false)
        // Re-enable scrolling after exit animation starts
        setTimeout(() => {
          document.body.style.overflow = ''
        }, 800)
      }, remainingTime)
    }

    if (document.readyState === 'complete') {
      finishLoading()
    } else {
      window.addEventListener('load', finishLoading)
      return () => {
        window.removeEventListener('load', finishLoading)
        document.body.style.overflow = ''
      }
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[var(--bg-color,#0a0a0a)] text-white"
        >
          <div className="flex flex-col items-center gap-8 relative">
            <div className="relative flex h-24 w-24 items-center justify-center">
              {/* Outer spinning ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-t-[2px] border-r-[2px] border-transparent border-t-[#3B82F6] opacity-80"
              />
              {/* Inner spinning ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-3 rounded-full border-b-[2px] border-l-[2px] border-transparent border-b-white opacity-80"
              />
              {/* Center pulsating dot */}
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="h-3 w-3 rounded-full bg-[#3B82F6] shadow-[0_0_15px_#3B82F6]" 
              />
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-sm tracking-[0.3em] text-[var(--text-primary,#ffffff)] font-bold"
              >
                THE AUTOMATION GUYS
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xs tracking-[0.2em] text-zinc-500 font-medium"
              >
                INITIALIZING SYSTEMS...
              </motion.div>
            </div>
            
            {/* Loading progress bar */}
            <div className="absolute -bottom-16 w-48 h-[2px] bg-zinc-800 overflow-hidden rounded-full">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
                className="h-full bg-[#3B82F6] shadow-[0_0_10px_#3B82F6]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
