'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { BlurRevealHeading, WordReveal } from '@/components/ui/animated-text'

export function FrictionSection() {
  const painPoints = [
    {
      num: '01',
      title: 'Double-entry tax',
      desc: 'Copy-pasting data between your CRM, email, and billing platforms every single afternoon.',
    },
    {
      num: '02',
      title: 'Handoff lag',
      desc: 'Leads waiting hours for a response because notifications live in fragmented Slack channels.',
    },
    {
      num: '03',
      title: 'Reporting blind spots',
      desc: 'Assembling manual spreadsheet updates instead of seeing live operational metrics.',
    },
    {
      num: '04',
      title: 'Scaling friction',
      desc: 'Adding more headcount just to manage manual administrative process overhead.',
    },
  ]

  return (
    <section className="py-24 border-b border-[var(--border-color)] bg-[var(--bg-color)] transition-colors" id="friction">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Tagline Badge */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-xs font-mono tracking-widest text-[#3B82F6] uppercase mb-4"
        >
          01 / THE FRICTION
        </motion.p>

        {/* Headline with Blur Reveal Effect */}
        <BlurRevealHeading className="mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold text-[var(--text-primary)] tracking-tight leading-tight max-w-4xl">
            The work between<br />
            <em className="font-serif italic text-[#3B82F6] font-normal">the work</em> is costing you.
          </h2>
        </BlurRevealHeading>

        {/* 4 Pain Point Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {painPoints.map((point, idx) => (
            <motion.article
              key={point.num}
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group relative p-8 rounded-2xl bg-[var(--surface-color)] border border-[var(--border-color)] hover:border-[#3B82F6] hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs text-[#3B82F6] mb-6">
                  <span>ITEM_{point.num}</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
                <h3 className="text-2xl font-serif text-[var(--text-primary)] group-hover:text-[#3B82F6] transition-colors mb-3">
                  {point.title}
                </h3>
                <WordReveal text={point.desc} className="text-sm font-sans text-[var(--text-secondary)] leading-relaxed" delay={0.1} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
