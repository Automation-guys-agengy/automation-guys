import { SectionLabel } from './AnimatedBlobs'

const stats = [['40+', 'hours saved every month'], ['3×', 'faster turnaround'], ['100%', 'less repetitive work']]

export function ProofSection() {
  return <section className="section page-shell proof"><SectionLabel>Why teams choose us</SectionLabel><div className="proof-heading"><h2>More time for<br /><em>the good stuff.</em></h2><p>We measure success in the things you can finally focus on when the busywork disappears.</p></div><div className="stats">{stats.map(([value, label]) => <div className="stat" key={value}><strong>{value}</strong><span>{label}</span></div>)}</div></section>
}
