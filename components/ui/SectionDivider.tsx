'use client'

import { motion } from 'framer-motion'

interface SectionDividerProps {
  text?: string
  reverse?: boolean
}

export function SectionDivider({ 
  text = "SYSTEM OPTIMIZED /// ZERO FRICTION /// AUTOPILOT ENGAGED /// ",
  reverse = false
}: SectionDividerProps) {
  // Duplicate text multiple times to ensure seamless infinite scroll
  const marqueeText = Array(12).fill(text).join(" ")

  return (
    <div className="relative w-full py-16 flex flex-col items-center justify-center overflow-hidden bg-transparent pointer-events-none">
      {/* Top fading line */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent opacity-50" />
      
      {/* Ticker tape */}
      <div className="relative z-10 w-[110%] bg-[#0A0A0A] border-y border-[#262626] py-3 overflow-hidden flex transform shadow-[0_0_40px_rgba(0,0,0,0.5)]" style={{ transform: `rotate(${reverse ? 2 : -2}deg) scale(1.1)` }}>
        <motion.div
          animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 35,
          }}
          className="flex whitespace-nowrap text-[#3B82F6] font-mono text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase opacity-70"
        >
          <span className="pr-8">{marqueeText}</span>
          <span className="pr-8">{marqueeText}</span>
        </motion.div>
      </div>
    </div>
  )
}
