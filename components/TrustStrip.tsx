'use client'

import { motion } from 'framer-motion'
import { TypewriterText } from '@/components/ui/animated-text'

export function TrustStrip() {
  const logos = [
    'OPENAI',
    'STRIPE',
    'SLACK',
    'HUBSPOT',
    'SALESFORCE',
    'MAKE',
    'POSTGRESQL',
    'PYTHON',
  ]

  return (
    <div className="border-b border-[var(--border-color)] bg-[var(--bg-color)] py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="text-xs font-mono tracking-widest text-[var(--text-secondary)] uppercase">
            <TypewriterText text="OPERATIONS POWERED BY INTELLIGENT STACKS" speed={30} />
          </p>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            {logos.map((logo, idx) => (
              <motion.span
                key={logo}
                initial={{ opacity: 0, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + idx * 0.05 }}
                className="text-xs font-mono tracking-widest text-[var(--text-secondary)] hover:text-[#3B82F6] transition-colors cursor-default select-none font-medium"
              >
                {logo}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
