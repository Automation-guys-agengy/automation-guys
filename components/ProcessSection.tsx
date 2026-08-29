import { SectionLabel } from './AnimatedBlobs'

const steps = [['01', 'Audit', 'We find the friction hiding in your day.'], ['02', 'Build', 'We design a system made for your business.'], ['03', 'Automate', 'We connect the pieces and make it run.'], ['04', 'Results', 'You get your time, clarity, and momentum back.']]

export function ProcessSection() {
  return <section className="section page-shell process" id="process"><SectionLabel>How it works</SectionLabel><div className="process-heading"><h2>Simple in.<br /><span>Powerful out.</span></h2><p>No jargon. No black boxes. Just a smarter way to work.</p></div><div className="process-grid">{steps.map(([num, title, copy]) => <article key={num} className="process-step"><span className="step-num">{num}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
}
