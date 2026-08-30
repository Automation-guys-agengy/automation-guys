'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { InteractiveQR } from './InteractiveQR'
import { TypewriterText, BlurRevealHeading } from '@/components/ui/animated-text'

export function ClosingCTA() {
  return (
    <section className="py-24 border-b border-[var(--border-color)] bg-[var(--bg-color)] transition-colors" id="contact">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-[var(--surface-color)] border border-[var(--border-color)] relative overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-xs font-mono tracking-widest text-[#3B82F6] uppercase">
                <TypewriterText text="06 / READY TO START" speed={35} />
              </p>

              <BlurRevealHeading>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold text-[var(--text-primary)] tracking-tight leading-tight">
                  Ready to build your<br />
                  <em className="font-serif italic text-[#3B82F6] font-normal">autonomous system?</em>
                </h2>
              </BlurRevealHeading>

              <p className="text-base text-[var(--text-secondary)] font-sans max-w-xl leading-relaxed">
                Tell us where your bottleneck lives. We'll map your existing process and show you how to turn it into an automated layer within 14 days.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <a
                  href="mailto:contact@theautomationguys.com"
                  className="btn-primary"
                >
                  <span>Schedule operational audit</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Content: Click-to-Reveal Canvas Dissolve QR Code Component */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <InteractiveQR />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
