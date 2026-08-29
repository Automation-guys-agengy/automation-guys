'use client'

export function AnimatedBlobs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="blob blob-blue" />
      <div className="blob blob-violet" />
      <div className="blob blob-cyan" />
      <div className="grid-overlay" />
    </div>
  )
}

export function ArrowUpRight() {
  return <span aria-hidden="true" className="text-lg leading-none">↗</span>
}

export function LineArrow() {
  return <span aria-hidden="true" className="text-xl leading-none">→</span>
}

export function CheckMark() {
  return <span aria-hidden="true" className="text-accent">✓</span>
}

export function LogoMark() {
  return <span className="logo-mark" aria-hidden="true"><span /><span /></span>
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="section-label"><span className="label-dot" />{children}</p>
}
