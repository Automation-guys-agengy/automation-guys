'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Sun, Moon, ArrowRight } from 'lucide-react'
import { useTheme } from '@/components/ThemeProvider'
import clsx from 'clsx'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out flex justify-center",
        scrolled ? "py-4 px-4 sm:px-6" : "py-0 px-0"
      )}
    >
      <div
        className={clsx(
          "relative flex items-center justify-between transition-all duration-500 ease-out",
          scrolled 
            ? "w-full max-w-5xl rounded-full bg-[var(--surface-color)]/80 backdrop-blur-2xl border border-[var(--border-color)]/50 shadow-[0_8px_32px_rgba(0,0,0,0.4)] px-6 py-3" 
            : "w-full max-w-7xl bg-[var(--surface-color)]/95 backdrop-blur-xl border-b border-[var(--border-color)] px-6 sm:px-8 lg:px-12 py-4"
        )}
      >
        {/* Scroll Progress Bar - Only visible when not scrolled or integrated nicely */}
        {!scrolled && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#3B82F6] origin-left z-50 shadow-[0_0_10px_#3B82F6]"
            style={{ scaleX }}
          />
        )}

        {/* Brand Logo & Wordmark Lockup */}
        <a
          href="#top"
          className="group flex items-center gap-3 text-sm font-mono tracking-widest uppercase font-bold text-[var(--text-primary)] hover:text-[#3B82F6] transition-colors"
        >
          {/* Brand Symbol Logo Image (logo.png) */}
          <div className="relative">
            <div className="absolute inset-0 bg-[#3B82F6] rounded-lg blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
            <img
              src="/logo.png"
              alt="The Automation Guys Logo"
              className="relative w-[34px] h-[34px] object-cover rounded-lg border border-[var(--border-color)] group-hover:border-[#3B82F6] transition-all shadow-sm shrink-0 overflow-hidden"
            />
          </div>

          <span className={clsx("leading-none transition-all duration-300", scrolled && "hidden sm:block")}>
            THE AUTOMATION GUYS
          </span>
          <span className="text-[#3B82F6] group-hover:translate-x-1 transition-transform leading-none duration-300">
            ///
          </span>
        </a>

        {/* Rephrased Editorial Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs tracking-widest text-[var(--text-secondary)]">
          {['SOLUTIONS', 'PROCESS', 'IMPACT', 'AUDIT'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase() === 'audit' ? 'contact' : item.toLowerCase()}`}
              className="group relative hover:text-[var(--text-primary)] transition-colors py-1 font-semibold"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#3B82F6] transition-all duration-300 ease-out group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Action Group: Theme Toggle & CTA */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark / Light Theme"
            className="p-2.5 rounded-full bg-transparent hover:bg-[var(--border-color)] border border-transparent hover:border-[var(--border-color)] text-[var(--text-primary)] transition-all cursor-pointer focus:outline-none"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[var(--text-primary)] hover:text-[#3B82F6] transition-colors" />
            ) : (
              <Moon className="w-4 h-4 text-[var(--text-primary)] hover:text-[#3B82F6] transition-colors" />
            )}
          </button>

          {/* Primary Navbar CTA Button */}
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-color)] overflow-hidden font-mono text-xs font-bold uppercase tracking-wider transition-transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 transition-colors group-hover:text-white">START A PROJECT</span>
            <ArrowRight className="w-3.5 h-3.5 relative z-10 transition-transform group-hover:translate-x-1 group-hover:text-white" />
          </a>
        </div>
      </div>
    </header>
  )
}

