'use client'

import { motion } from 'framer-motion'
import { ArrowUp, Terminal } from 'lucide-react'

export function Footer() {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer className="relative bg-[var(--bg-color)] border-t border-[var(--border-color)] py-16 overflow-hidden transition-colors">
      {/* ── 1. Electric Blue Ambient Line Separator ───────────────────────── */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent opacity-80 shadow-[0_0_15px_#3B82F6] z-10" />

      {/* ── 2. Electric Blue Colored Aurora Light Effect ─────────────────── */}
      <div className="pointer-events-none absolute top-0 inset-x-0 h-48 overflow-hidden z-0">
        {/* Main Aurora Radial Glow Canopy */}
        <motion.div
          animate={{
            opacity: [0.6, 0.9, 0.6],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-full h-full bg-[radial-gradient(ellipse_90%_70%_at_50%_-20%,rgba(59,130,246,0.38),rgba(30,58,138,0.18)_50%,transparent_80%)] blur-2xl"
        />

        {/* Secondary Shimmer Beam Accent */}
        <div className="absolute top-0 left-1/4 w-1/2 h-24 bg-gradient-to-r from-transparent via-[#3B82F6]/25 to-transparent blur-xl" />
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 font-mono text-xs text-[var(--text-secondary)]">
        {/* Wordmark */}
        <div className="flex items-center gap-2 text-[var(--text-primary)] font-bold tracking-wider">
          <div className="w-5 h-5 rounded bg-[var(--surface-color)] border border-[var(--border-color)] flex items-center justify-center text-[#3B82F6]">
            <Terminal className="w-3 h-3" />
          </div>
          <span>THE AUTOMATION GUYS</span>
          <span className="text-[#3B82F6]">///</span>
        </div>

        {/* Socials & Copyright */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          <span>© 2026 / Intelligent systems for ambitious teams.</span>
          <div className="flex items-center gap-4 text-[var(--text-primary)]">
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#3B82F6] transition-colors"
            >
              TWITTER / X
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#3B82F6] transition-colors"
            >
              LINKEDIN
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#3B82F6] transition-colors"
            >
              GITHUB
            </a>
          </div>
        </div>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 hover:text-[#3B82F6] transition-colors cursor-pointer group"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5 text-[#3B82F6] group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  )
}
