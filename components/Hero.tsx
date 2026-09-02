'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ArrowRight, Terminal } from 'lucide-react'
import { StarField } from '@/components/StarField'
import { DeferMount } from '@/components/DeferMount'

// Dynamically import the WebGL black hole — deferred so shader compiles
// AFTER the preloader exits (avoids the GPU stall on first paint)
const BlackHoleHeroSection = dynamic(
  () =>
    import('@/components/ui/blackhole-hero-section').then(
      (mod) => mod.BlackHoleHeroSection
    ),
  { ssr: false }
)

export function Hero() {
  return (
    <section
      className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden border-b border-[#262626] bg-[#0A0A0A]"
      aria-label="Hero Section"
    >
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        {/* Static black hole — deferred 3 s so shader compiles after preloader exits */}
        <DeferMount delay={3000}>
          <BlackHoleHeroSection
            distance={24}
            elevation={-5.5}
            azimuth={0}
            fov={42}
            diskInner={3}
            diskOuter={16}
            diskThickness={0.26}
            diskDensity={1.1}
            brightness={1.2}
            spinSpeed={0}
            grain={0.48}
            doppler={0.35}
            hotColor="#FFF3DE"
            midColor="#3B82F6"
            coolColor="#1E3A8A"
            starBrightness={0}
            glow={1.0}
            exposure={0.9}
            vignette={0.3}
            steps={110}
            resolution={0.6}
            maxDpr={1.0}
            focus={[0.72, 0.46]}
            scrim="left"
            scrimStrength={0.88}
            paused={true}
            className="absolute inset-0 w-full h-full"
          />
        </DeferMount>

        {/* Animated twinkling stars layered on top of the black hole */}
        <StarField count={260} className="z-10" />
      </div>

      {/* Hero Text Directly Overlayed */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center">
        <div className="max-w-2xl space-y-8 text-left py-12">
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#141414]/90 backdrop-blur-md border border-[#262626] text-xs font-mono tracking-widest text-[#3B82F6] uppercase shadow-xl"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>AG / 2026</span>
            <span className="text-[#8C8C88]">///</span>
            <span>OPERATIONS, REWIRED</span>
          </motion.div>

          {/* Main Editorial Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-sans font-extrabold text-[#F2F2F0] tracking-tight leading-[0.95] drop-shadow-lg"
          >
            Your business should<br />
            <em className="font-serif italic text-[#3B82F6] font-normal">run without you.</em>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-[#8C8C88] max-w-xl leading-relaxed font-sans"
          >
            We turn the manual work slowing ambitious teams down into an intelligent operating system.
          </motion.p>

          {/* Primary CTA & Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <a href="#contact" className="btn-primary">
              <span>Find your bottleneck</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <div className="flex items-center gap-2 text-xs font-mono text-[#8C8C88]">
              <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
              <span>Built for teams done stitching tools together</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
