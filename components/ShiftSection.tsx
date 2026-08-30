'use client'

import { motion } from 'framer-motion'
import { BlurRevealHeading } from '@/components/ui/animated-text'

export function ShiftSection() {
  return (
    <section className="py-28 border-b border-[var(--border-color)] bg-[var(--bg-color)] transition-colors relative overflow-hidden" id="shift">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-xs font-mono tracking-widest text-[#3B82F6] uppercase mb-6"
        >
          02 / THE SHIFT
        </motion.p>

        <BlurRevealHeading>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-extrabold text-[var(--text-primary)] tracking-tight leading-[1.05] max-w-5xl">
            We replace the<br />
            <em className="font-serif italic text-[#3B82F6] font-normal">busywork layer.</em>
          </h2>
        </BlurRevealHeading>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 max-w-2xl"
        >
          <p className="text-lg text-[var(--text-secondary)] font-sans leading-relaxed">
            Your team shouldn't be human routers. We design autonomous systems that capture signals, process decisions, and update your stack in real-time.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
