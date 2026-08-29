import { ArrowUpRight, SectionLabel } from './AnimatedBlobs'

const services = [
  ['01', 'Workflow automation', 'Connect the tools you already use. Make them work as one.'],
  ['02', 'CRM & lead-gen', 'Turn more conversations into customers, automatically.'],
  ['03', 'Invoicing & reporting', 'Get paid faster. Know exactly what is happening.'],
  ['04', 'Customer support', 'Give your customers instant, thoughtful answers.'],
  ['05', 'Smart integrations', 'The right data, in the right place, at the right time.'],
  ['06', 'Custom builds', 'Have a unique problem? We love those.'],
]

export function ServicesGrid() {
  return <section className="section page-shell" id="services"><div className="section-intro services-intro"><SectionLabel>What we do</SectionLabel><h2>Less busywork.<br /><span>More business.</span></h2><p>We design and build the systems behind your best work.</p></div><div className="services-grid">{services.map(([number, title, copy]) => <article className="service-card" key={number}><span className="service-number">{number}</span><h3>{title}</h3><p>{copy}</p><span className="service-arrow"><ArrowUpRight /></span></article>)}</div></section>
}
