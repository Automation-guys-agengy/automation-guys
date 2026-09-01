'use client'

import dynamic from 'next/dynamic'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { LazySection } from '@/components/LazySection'

// === STEP 1: Above the fold — loads immediately ===
// Navbar + Hero are eagerly imported above

// === STEP 2: Just below the fold — light components, lazy mounted ===
const TrustStrip = dynamic(
  () => import('@/components/TrustStrip').then((m) => m.TrustStrip),
  { ssr: false }
)
const SectionDivider = dynamic(
  () => import('@/components/ui/SectionDivider').then((m) => m.SectionDivider),
  { ssr: false }
)

// === STEP 3: Mid-page — medium-weight sections ===
const FrictionSection = dynamic(
  () => import('@/components/FrictionSection').then((m) => m.FrictionSection),
  { ssr: false }
)
const ShiftSection = dynamic(
  () => import('@/components/ShiftSection').then((m) => m.ShiftSection),
  { ssr: false }
)

// === STEP 4: Heavy interactive sections ===
const LiveDemoSection = dynamic(
  () => import('@/components/ui/LiveDemoSection').then((m) => m.LiveDemoSection),
  { ssr: false }
)

// === STEP 5: Heaviest — GSAP video pin reveal ===
const HeroScrollVideoReveal = dynamic(
  () =>
    import('@/components/ui/hero-scroll-video-pin-reveal').then(
      (mod) => mod.HeroScrollVideoReveal
    ),
  { ssr: false }
)

// === STEP 6: Lower page sections ===
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
      {/* ── STEP 1: Above the fold (instant) ── */}
      <DevtoolsEasterEgg />
      <Navbar />
      <Hero />

      {/* ── STEP 2: Just below fold — loads when within 600px ── */}
      <LazySection rootMargin="600px" minHeight="80px">
        <TrustStrip />
      </LazySection>

      {/* ── STEP 3: Mid-page sections ── */}
      <LazySection rootMargin="400px" minHeight="600px">
        <SectionDivider text="IDENTIFYING BOTTLENECKS /// " />
        <FrictionSection />
        <ShiftSection />
      </LazySection>

      {/* ── STEP 4: Live Demo — heavy interactive ── */}
      <LazySection rootMargin="300px" minHeight="600px">
        <SectionDivider text="LIVE DEMO /// " reverse={false} />
        <LiveDemoSection />
      </LazySection>

      {/* ── STEP 5: GSAP Video Reveal — heaviest component ── */}
      <LazySection rootMargin="300px" minHeight="800px">
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
      </LazySection>

      {/* ── STEP 6: Lower page ── */}
      <LazySection rootMargin="300px" minHeight="600px">
        <SectionDivider text="AUTOPILOT ENGAGED /// " />
        <SystemsGrid />
        <MethodSection />
      </LazySection>

      {/* ── STEP 7: Bottom — outcomes, CTA, footer ── */}
      <LazySection rootMargin="300px" minHeight="400px">
        <SectionDivider text="MEASURABLE IMPACT /// " reverse={true} />
        <OutcomeSection />
        <ClosingCTA />
        <Footer />
      </LazySection>
    </main>
  )
}
