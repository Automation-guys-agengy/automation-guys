'use client'

import { motion } from 'framer-motion'
import { BlurRevealHeading } from '@/components/ui/animated-text'

export function MethodSection() {
  const steps = [
    {
      num: '01',
      title: 'Map the mess',
      copy: 'We find the repeated work, the manual handoffs, and the costly gaps across your stack.',
    },
    {
      num: '02',
      title: 'Build the machine',
      copy: 'We connect your tools into an autonomous system that runs with precision and intention.',
    },
    {
      num: '03',
      title: 'Make it yours',
      copy: 'Your team gets a clear, reliable operating layer — not another dashboard to babysit.',
    },
  ]

  return (
    <section className="py-24 border-b border-[var(--border-color)] bg-[var(--bg-color)] transition-colors" id="method">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-mono tracking-widest text-[#3B82F6] uppercase mb-4"
          >
            04 / THE METHOD
          </motion.p>

          <BlurRevealHeading>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold text-[var(--text-primary)] tracking-tight leading-tight">
              Clarity before<br />
              <em className="font-serif italic text-[#3B82F6] font-normal">complexity.</em>
            </h2>
          </BlurRevealHeading>
        </div>

        {/* 3 Step Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group relative p-8 rounded-2xl bg-[var(--surface-color)] border border-[var(--border-color)] hover:border-[#3B82F6] transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div>
                <span className="inline-block px-3 py-1 rounded bg-[var(--bg-color)] border border-[var(--border-color)] font-mono text-xs font-bold text-[#3B82F6] mb-8">
                  PHASE {step.num}
                </span>

                <h3 className="text-2xl font-serif text-[var(--text-primary)] mb-4">
                  {step.title}
                </h3>

                <p className="text-sm font-sans text-[var(--text-secondary)] leading-relaxed">
                  {step.copy}
                </p>
              </div>

              <div className="pt-10 font-mono text-[11px] text-[var(--text-secondary)]">
                <span>STAGE_{step.num} // VERIFIED</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
