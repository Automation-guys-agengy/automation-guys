'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import { BlurRevealHeading } from '@/components/ui/animated-text'

export function SystemsGrid() {
  const services = [
    { num: '01', title: 'Lead capture & qualification', desc: 'Automated intake, lead scoring, and instant CRM distribution.' },
    { num: '02', title: 'CRM & sales operations', desc: 'Keeping pipelines in sync without reps lifting a finger.' },
    { num: '03', title: 'Invoicing & automated reporting', desc: 'Real-time financial signals, receipts, and billing triggers.' },
    { num: '04', title: 'Customer support routing', desc: 'Intelligent ticket triage, AI response draft, and context enrichment.' },
    { num: '05', title: 'Internal knowledge workflows', desc: 'Connecting company docs directly to automated team workflows.' },
    { num: '06', title: 'Custom API & webhooks engine', desc: 'Tailored integrations between legacy platforms and modern AI stacks.' },
  ]

  return (
    <section className="py-24 border-b border-[var(--border-color)] bg-[var(--bg-color)] transition-colors" id="systems">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-xs font-mono tracking-widest text-[#3B82F6] uppercase mb-4"
            >
              03 / WHAT WE BUILD
            </motion.p>

            <BlurRevealHeading>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold text-[var(--text-primary)] tracking-tight leading-tight">
                Systems that<br />
                <em className="font-serif italic text-[#3B82F6] font-normal">pull their weight.</em>
              </h2>
            </BlurRevealHeading>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-base text-[var(--text-secondary)] font-sans max-w-md"
          >
            Start with one constraint. Leave with an operating layer built around how your team actually works.
          </motion.p>
        </div>

        {/* 6 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <motion.article
              key={service.num}
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="group relative p-8 rounded-2xl bg-[var(--surface-color)] border border-[var(--border-color)] hover:border-[#3B82F6] hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs text-[#3B82F6] mb-6">
                  <span>{service.num}</span>
                  <Check className="w-4 h-4 text-[#3B82F6]" />
                </div>
                <h3 className="text-2xl font-serif text-[var(--text-primary)] group-hover:text-[#3B82F6] transition-colors mb-3">
                  {service.title}
                </h3>
                <p className="text-sm font-sans text-[var(--text-secondary)] leading-relaxed">
                  {service.desc}
                </p>
              </div>

              <div className="pt-8 flex items-center justify-between text-xs font-mono text-[var(--text-secondary)] group-hover:text-[#3B82F6] transition-colors">
                <span>AUTOMATED LAYER</span>
                <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
