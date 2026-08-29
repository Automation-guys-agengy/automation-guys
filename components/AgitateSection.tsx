import { SectionLabel } from './AnimatedBlobs'

const tasks = ['Copying data between tools', 'Chasing invoices & payments', 'Following up with every lead', 'Building the same reports again']

export function AgitateSection() {
  return <section className="section page-shell agitate" id="problem">
    <div className="section-intro"><SectionLabel>The old way</SectionLabel><h2>Your best people shouldn&apos;t be<br /><span>busywork specialists.</span></h2></div>
    <div className="task-stack">{tasks.map((task, index) => <div className="task-card" key={task}><span className="task-index">0{index + 1}</span><span>{task}</span><span className="task-x">×</span></div>)}</div>
    <p className="side-note">Sound familiar?<br /><span>It doesn&apos;t have to.</span></p>
  </section>
}
