'use client'

import dynamic from 'next/dynamic'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { TrustStrip } from '@/components/TrustStrip'
import { SectionDivider } from '@/components/ui/SectionDivider'
import { DeferMount } from '@/components/DeferMount'

// Dynamic imports for code splitting — JS bundles load in parallel
// but all mount immediately so the full page is ready before loader dismisses
const FrictionSection = dynamic(
  () => import('@/components/FrictionSection').then((m) => m.FrictionSection),
  { ssr: false }
)
const ShiftSection = dynamic(
  () => import('@/components/ShiftSection').then((m) => m.ShiftSection),
  { ssr: false }
)
const LiveDemoSection = dynamic(
  () => import('@/components/ui/LiveDemoSection').then((m) => m.LiveDemoSection),
  { ssr: false }
)
const HeroScrollVideoReveal = dynamic(
  () =>
    import('@/components/ui/hero-scroll-video-pin-reveal').then(
      (mod) => mod.HeroScrollVideoReveal
    ),
  { ssr: false }
)
const SystemsGrid = dynamic(
  () => import('@/components/SystemsGrid').then((m) => m.SystemsGrid),
  { ssr: false }
)
const MethodSection = dynamic(
  () => import('@/components/MethodSection').then((m) => m.MethodSection),
  { ssr: false }
)
const OutcomeSection = dynamic(
  () => import('@/components/OutcomeSection').then((m) => m.OutcomeSection),
  { ssr: false }
)
const ClosingCTA = dynamic(
  () => import('@/components/ClosingCTA').then((m) => m.ClosingCTA),
  { ssr: false }
)
const Footer = dynamic(
  () => import('@/components/Footer').then((m) => m.Footer),
  { ssr: false }
)
const DevtoolsEasterEgg = dynamic(
  () => import('@/components/DevtoolsEasterEgg').then((m) => m.DevtoolsEasterEgg),
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
      
      <DeferMount delay={100}>
        <SectionDivider text="IDENTIFYING BOTTLENECKS /// " />
        <FrictionSection />
        <ShiftSection />
      </DeferMount>

      <DeferMount delay={200}>
        <SectionDivider text="LIVE DEMO /// " reverse={false} />
        <LiveDemoSection />
      </DeferMount>

      <DeferMount delay={300}>
        <SectionDivider text="SYSTEM ARCHITECTURE /// " reverse={true} />
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
      </DeferMount>

      <DeferMount delay={400}>
        <SectionDivider text="AUTOPILOT ENGAGED /// " />
        <SystemsGrid />
        <MethodSection />
      </DeferMount>
      
      <DeferMount delay={500}>
        <SectionDivider text="MEASURABLE IMPACT /// " reverse={true} />
        <OutcomeSection />
        <ClosingCTA />
        <Footer />
      </DeferMount>
    </main>
  )
}
