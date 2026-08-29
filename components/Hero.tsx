import { ArrowUpRight, LineArrow, LogoMark } from './AnimatedBlobs'

export function Hero() {
  return (
    <section className="hero-section page-shell" id="top">
      <nav className="site-nav" aria-label="Main navigation">
        <a className="brand" href="#top"><LogoMark /><span>THE AUTOMATION<br />GUYS</span></a>
        <div className="nav-links"><a href="#services">Services</a><a href="#process">Our process</a><a href="#contact">Contact</a></div>
        <a className="nav-cta" href="#contact">Let&apos;s talk <ArrowUpRight /></a>
      </nav>
      <div className="hero-content">
        <div className="hero-kicker"><span>01 / 05</span><span>Systems for the ambitious</span></div>
        <h1>Stop doing<br /><em>everything</em><br />manually.</h1>
        <div className="hero-bottom">
          <p>We build intelligent systems that give your business its most valuable resource back: <strong>your time.</strong></p>
          <a className="circle-link" href="#services" aria-label="Explore our services"><LineArrow /></a>
        </div>
      </div>
      <div className="scroll-cue"><span className="scroll-line" /> Scroll to automate</div>
    </section>
  )
}
