'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Spring physics for trailing halo ring
  const springConfig = { damping: 24, stiffness: 220, mass: 0.5 }
  const trailX = useSpring(mouseX, springConfig)
  const trailY = useSpring(mouseY, springConfig)

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return
    }

    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target?.closest('a') ||
        target?.closest('button') ||
        target?.closest('.btn-primary') ||
        target?.closest('.btn-secondary') ||
        target?.closest('.cursor-pointer') ||
        target?.closest('article')
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    document.body.addEventListener('mouseleave', handleMouseLeave)
    document.body.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
      document.body.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [mouseX, mouseY])

  if (!isVisible) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Trailing Halo Ring */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
        }}
        animate={{
          scale: isHovered ? 2.2 : 1,
          opacity: isHovered ? 0.9 : 0.45,
          borderColor: isHovered ? '#3B82F6' : 'rgba(59, 130, 246, 0.5)',
        }}
        transition={{ duration: 0.15 }}
        className="-translate-x-1/2 -translate-y-1/2 fixed top-0 left-0 w-8 h-8 rounded-full border border-[#3B82F6] shadow-[0_0_15px_rgba(59,130,246,0.3)] backdrop-blur-[1px]"
      />

      {/* Inner Electric Blue Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: isHovered ? 0.5 : 1,
        }}
        transition={{ duration: 0.1 }}
        className="-translate-x-1/2 -translate-y-1/2 fixed top-0 left-0 w-2 h-2 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]"
      />
    </div>
  )
}
