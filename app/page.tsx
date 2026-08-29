import { AnimatedBlobs } from '@/components/AnimatedBlobs'
import { AgitateSection } from '@/components/AgitateSection'
import { ClosingCTA } from '@/components/ClosingCTA'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { ProcessSection } from '@/components/ProcessSection'
import { ProofSection } from '@/components/ProofSection'
import { RevealSection } from '@/components/RevealSection'
import { ServicesGrid } from '@/components/ServicesGrid'

export default function Page() {
  return <main><AnimatedBlobs /><Hero /><AgitateSection /><RevealSection /><ServicesGrid /><ProcessSection /><ProofSection /><ClosingCTA /><Footer /></main>
}
