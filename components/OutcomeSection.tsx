'use client'

import { motion } from 'framer-motion'
import { BlurRevealHeading } from '@/components/ui/animated-text'

export function OutcomeSection() {
  const stats = [
    { value: '40%', label: 'Average admin time eliminated in 30 days' },
    { value: '2.4×', label: 'Faster lead-to-opportunity response velocity' },
    { value: '1', label: 'Unified operating system replacing 8 disparate apps' },
  ]

  return (
    <section className="py-24 border-b border-[var(--border-color)] bg-[var(--bg-color)] transition-colors" id="outcome">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-mono tracking-widest text-[#3B82F6] uppercase mb-4"
          >
            05 / THE PROOF
          </motion.p>

          <BlurRevealHeading>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold text-[var(--text-primary)] tracking-tight leading-tight">
              Measured in hours saved,<br />
              <em className="font-serif italic text-[#3B82F6] font-normal">not promises made.</em>
            </h2>
          </BlurRevealHeading>
        </div>

        {/* 3 Stat Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.12 }}
              className="p-8 rounded-2xl bg-[var(--surface-color)] border border-[var(--border-color)] flex flex-col justify-between"
            >
              <div className="text-5xl sm:text-6xl font-sans font-extrabold text-[#3B82F6] tracking-tight mb-4">
                {stat.value}
              </div>
              <p className="text-sm font-sans text-[var(--text-secondary)] leading-relaxed">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
