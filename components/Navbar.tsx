'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Sun, Moon, ArrowRight } from 'lucide-react'
import { useTheme } from '@/components/ThemeProvider'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 bg-[var(--surface-color)]/95 backdrop-blur-xl border-b border-[var(--border-color)] shadow-sm ${
        scrolled ? 'py-3 shadow-md' : 'py-4'
      }`}
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#3B82F6] origin-left z-50 shadow-[0_0_10px_#3B82F6]"
        style={{ scaleX }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Logo & Wordmark Lockup */}
        <a
          href="#top"
          className="group flex items-center gap-3 text-sm font-mono tracking-widest uppercase font-bold text-[var(--text-primary)] hover:text-[#3B82F6] transition-colors"
        >
          {/* Brand Symbol Logo Image (logo.png) */}
          <img
            src="/logo.png"
            alt="The Automation Guys Logo"
            className="w-[34px] h-[34px] object-cover rounded-lg border border-[var(--border-color)] group-hover:border-[#3B82F6] group-hover:shadow-[0_0_12px_rgba(59,130,246,0.3)] transition-all shadow-sm shrink-0 overflow-hidden"
          />

          <span className="leading-none">THE AUTOMATION GUYS</span>
          <span className="text-[#3B82F6] group-hover:translate-x-0.5 transition-transform leading-none">
            ///
          </span>
        </a>

        {/* Rephrased Editorial Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs tracking-widest text-[var(--text-secondary)]">
          <a
            href="#systems"
            className="hover:text-[var(--text-primary)] hover:text-[#3B82F6] transition-colors relative py-1 font-semibold"
          >
            SOLUTIONS
          </a>
          <a
            href="#method"
            className="hover:text-[var(--text-primary)] hover:text-[#3B82F6] transition-colors relative py-1 font-semibold"
          >
            PROCESS
          </a>
          <a
            href="#outcome"
            className="hover:text-[var(--text-primary)] hover:text-[#3B82F6] transition-colors relative py-1 font-semibold"
          >
            IMPACT
          </a>
          <a
            href="#contact"
            className="hover:text-[var(--text-primary)] hover:text-[#3B82F6] transition-colors relative py-1 font-semibold"
          >
            AUDIT
          </a>
        </nav>

        {/* Right Action Group: Theme Toggle & CTA */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark / Light Theme"
            className="p-2.5 rounded-lg bg-[var(--bg-color)] border border-[var(--border-color)] text-[var(--text-primary)] hover:text-[#3B82F6] hover:border-[#3B82F6] transition-all cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#3B82F6] transition-transform hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-[#3B82F6] transition-transform hover:-rotate-12" />
            )}
          </button>

          {/* Primary Navbar CTA Button */}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all transform hover:-translate-y-0.5 shadow-md hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
          >
            <span>START A PROJECT</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  )
}
