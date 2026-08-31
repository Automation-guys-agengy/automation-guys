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
    <div className="relative w-full py-10 flex flex-col items-center justify-center overflow-hidden bg-transparent pointer-events-none">
      
      {/* Ticker tape */}
      <div className="relative z-10 w-full bg-[#0A0A0A]/40 backdrop-blur-md py-3 overflow-hidden flex shadow-[0_0_30px_rgba(0,0,0,0.4)]">
        {/* Top glowing line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#3B82F6]/60 to-transparent" />
        
        <motion.div
          animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 35,
          }}
          className="flex whitespace-nowrap text-[#3B82F6] font-mono text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase opacity-80"
        >
          <span className="pr-8">{marqueeText}</span>
          <span className="pr-8">{marqueeText}</span>
        </motion.div>

        {/* Bottom glowing line */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--border-color)]/60 to-transparent" />
      </div>
    </div>
  )
}
