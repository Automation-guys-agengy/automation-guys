'use client'

import dynamic from 'next/dynamic'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { TrustStrip } from '@/components/TrustStrip'
import { FrictionSection } from '@/components/FrictionSection'
import { ShiftSection } from '@/components/ShiftSection'
import { SystemsGrid } from '@/components/SystemsGrid'
import { MethodSection } from '@/components/MethodSection'
import { OutcomeSection } from '@/components/OutcomeSection'
import { ClosingCTA } from '@/components/ClosingCTA'
import { Footer } from '@/components/Footer'
import { DevtoolsEasterEgg } from '@/components/DevtoolsEasterEgg'
import { SectionDivider } from '@/components/ui/SectionDivider'
import { LiveDemoSection } from '@/components/ui/LiveDemoSection'

// Dynamic import for heavy GSAP video pin reveal component
const HeroScrollVideoReveal = dynamic(
  () =>
    import('@/components/ui/hero-scroll-video-pin-reveal').then(
      (mod) => mod.HeroScrollVideoReveal
    ),
  { ssr: false }
)

export default function Page() {
  const customTags = [
    { text: 'Zero Admin Friction', background: '#3B82F6', color: '#ffffff' },
    { text: 'Intelligent Workflows', background: '#141414', color: '#F2F2F0' },
    { text: 'Endlessly Scalable', background: '#262626', color: '#3B82F6' },
    { text: 'Real-time Signal Sync', background: '#1E3A8A', color: '#ffffff' },
  ]

  return (
    <main
      className="min-h-screen bg-[var(--bg-color)] bg-grid-pattern text-[var(--text-primary)] antialiased selection:bg-[#3B82F6] selection:text-white"
      id="top"
    >
      <DevtoolsEasterEgg />
      <Navbar />
      <Hero />
      <TrustStrip />
      
      <SectionDivider text="IDENTIFYING BOTTLENECKS /// " />
      <FrictionSection />
      <ShiftSection />

      <SectionDivider text="LIVE DEMO /// " reverse={false} />
      <LiveDemoSection />

      <SectionDivider text="SYSTEM ARCHITECTURE /// " reverse={true} />
      {/* Kinetic Scroller Pin Reveal Section */}
      <HeroScrollVideoReveal
        headingText={
          <>
            Step into autonomous operations.<br />
            Intelligent systems tell the story.
          </>
        }
        tags={customTags}
        subText="And your operations continue running 24/7 without manual intervention..."
      />

      <SectionDivider text="AUTOPILOT ENGAGED /// " />
      <SystemsGrid />
      <MethodSection />
      
      <SectionDivider text="MEASURABLE IMPACT /// " reverse={true} />
      <OutcomeSection />
      <ClosingCTA />
      <Footer />
    </main>
  )
}
