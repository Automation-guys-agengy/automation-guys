import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from '@/components/ThemeProvider'
import { CustomCursor } from '@/components/CustomCursor'
import { PreloaderDismiss } from '@/components/Preloader'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Automation Guys | The Premium Automation Agency',
  description:
    'We are The Automation Guys—an elite automation agency turning manual work into intelligent operating systems for ambitious teams. Hire the top automation guy for your business.',
  keywords: [
    'The Automation Guys',
    'the automation guy',
    'the automation agency',
    'AI automation agency',
    'business automation expert',
    'workflow automation consultant',
    'operations agency',
    'process automation',
    'intelligent operating systems',
  ],
  authors: [
    { name: 'Aditya Verma' },
    { name: 'Manish Yadav' },
    { name: 'Heemanshu' },
    { name: 'The Automation Guys' }
  ],
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'The Automation Guys | The Premium Automation Agency',
    description:
      'We turn manual work into intelligent operating systems. The premier automation agency for ambitious teams.',
    url: 'https://theautomationguys.com',
    siteName: 'The Automation Guys',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Automation Guys | The Premium Automation Agency',
    description:
      'We turn manual work into intelligent operating systems. The premier automation agency for ambitious teams.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
}

// JSON-LD Schema for Organization and Local SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'The Automation Guys',
  alternateName: ['The Automation Guy', 'The Automation Agency', 'Automation Guys'],
  description: 'An elite AI and workflow automation agency building intelligent operating systems for ambitious businesses.',
  url: 'https://theautomationguys.com',
  logo: 'https://theautomationguys.com/logo.png',
  image: 'https://theautomationguys.com/logo.png',
  sameAs: [
    'https://twitter.com/theautomationguys',
    'https://linkedin.com/company/theautomationguys',
  ],
  areaServed: ['Panchkula', 'Haryana', 'India', 'Worldwide'],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Panchkula',
    addressRegion: 'Haryana',
    addressCountry: 'IN'
  },
  founders: [
    { '@type': 'Person', name: 'Aditya Verma' },
    { '@type': 'Person', name: 'Manish Yadav' },
    { '@type': 'Person', name: 'Heemanshu' }
  ],
  priceRange: '$$$',
  knowsAbout: [
    'Business Process Automation',
    'AI Integration',
    'Workflow Optimization',
    'CRM Automation'
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        {/* Geo-tagging for Local SEO */}
        <meta name="geo.region" content="IN-HR" />
        <meta name="geo.placename" content="Panchkula" />
        <meta name="geo.position" content="30.6942;76.8606" />
        <meta name="ICBM" content="30.6942, 76.8606" />
        {/* JSON-LD Schema Script */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Preloader styles — pure CSS, renders instantly on first paint */}
        <style dangerouslySetInnerHTML={{ __html: `
          /* ── Reset & base ──────────────────────────────────────────────── */
          #preloader {
            --pl-progress: 0%;
            position: fixed; inset: 0; z-index: 99999;
            display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            background: #0A0A0A;
            overflow: hidden;
            transition: none;
          }

          /* ── Grid texture ──────────────────────────────────────────────── */
          #preloader::before {
            content: '';
            position: absolute; inset: 0;
            background-image:
              linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px);
            background-size: 40px 40px;
            pointer-events: none;
          }

          /* ── Blue radial glow orb ──────────────────────────────────────── */
          #preloader::after {
            content: '';
            position: absolute;
            top: 40%; left: 50%;
            transform: translate(-50%, -50%);
            width: 600px; height: 400px;
            background: radial-gradient(ellipse at center, rgba(59,130,246,0.12) 0%, transparent 70%);
            pointer-events: none;
            animation: pl-orb-pulse 3s ease-in-out infinite;
          }

          /* ── Corner accent lines ───────────────────────────────────────── */
          .pl-corner {
            position: absolute;
            width: 40px; height: 40px;
            border-color: rgba(59,130,246,0.4);
            border-style: solid;
          }
          .pl-corner-tl { top: 32px; left: 32px; border-width: 1px 0 0 1px; }
          .pl-corner-tr { top: 32px; right: 32px; border-width: 1px 1px 0 0; }
          .pl-corner-bl { bottom: 32px; left: 32px; border-width: 0 0 1px 1px; }
          .pl-corner-br { bottom: 32px; right: 32px; border-width: 0 1px 1px 0; }

          /* ── Status line (top) ─────────────────────────────────────────── */
          .pl-status-line {
            position: absolute; top: 36px; left: 50%; transform: translateX(-50%);
            display: flex; align-items: center; gap: 12px;
            font-family: 'SF Mono', ui-monospace, monospace;
            font-size: 10px; letter-spacing: 0.2em;
            color: rgba(255,255,255,0.25);
            white-space: nowrap;
            opacity: 0;
            animation: pl-fade-in 0.6s ease 0.4s both;
          }
          .pl-status-dot {
            width: 6px; height: 6px; border-radius: 50%;
            background: #3B82F6;
            box-shadow: 0 0 8px #3B82F6;
            animation: pl-blink 1.2s ease-in-out infinite;
          }

          /* ── Main logo wordmark ────────────────────────────────────────── */
          .pl-logo-wrap {
            position: relative; z-index: 1;
            text-align: center;
            margin-bottom: 12px;
          }
          .pl-logo-the {
            font-family: ui-monospace, 'SF Mono', monospace;
            font-size: 11px; letter-spacing: 0.35em;
            color: rgba(255,255,255,0.35);
            text-transform: uppercase;
            display: block; margin-bottom: 10px;
            opacity: 0;
            animation: pl-fade-in 0.5s ease 0.1s both;
          }
          .pl-logo-letters {
            display: flex; gap: 2px;
            justify-content: center; align-items: baseline;
            flex-wrap: nowrap;
          }
          .pl-letter {
            font-family: system-ui, -apple-system, sans-serif;
            font-size: clamp(22px, 5vw, 42px);
            font-weight: 800;
            color: #F2F2F0;
            letter-spacing: 0.05em;
            display: inline-block;
            opacity: 0;
            transform: translateY(18px);
            animation: pl-letter-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
          }
          .pl-letter.space { width: 14px; }
          /* Stagger each letter */
          .pl-letter:nth-child(1)  { animation-delay: 0.10s; }
          .pl-letter:nth-child(2)  { animation-delay: 0.14s; }
          .pl-letter:nth-child(3)  { animation-delay: 0.18s; }
          .pl-letter:nth-child(4)  { animation-delay: 0.24s; } /* space */
          .pl-letter:nth-child(5)  { animation-delay: 0.28s; }
          .pl-letter:nth-child(6)  { animation-delay: 0.32s; }
          .pl-letter:nth-child(7)  { animation-delay: 0.36s; }
          .pl-letter:nth-child(8)  { animation-delay: 0.40s; }
          .pl-letter:nth-child(9)  { animation-delay: 0.44s; }
          .pl-letter:nth-child(10) { animation-delay: 0.48s; }
          .pl-letter:nth-child(11) { animation-delay: 0.52s; }
          .pl-letter:nth-child(12) { animation-delay: 0.56s; }
          .pl-letter:nth-child(13) { animation-delay: 0.60s; } /* space */
          .pl-letter:nth-child(14) { animation-delay: 0.64s; }
          .pl-letter:nth-child(15) { animation-delay: 0.68s; }
          .pl-letter:nth-child(16) { animation-delay: 0.72s; }
          .pl-letter:nth-child(17) { animation-delay: 0.76s; }
          /* Blue accent on GUYS */
          .pl-letter:nth-child(14),
          .pl-letter:nth-child(15),
          .pl-letter:nth-child(16),
          .pl-letter:nth-child(17) { color: #3B82F6; }

          /* ── Tagline ───────────────────────────────────────────────────── */
          .pl-tagline {
            font-family: ui-monospace, 'SF Mono', monospace;
            font-size: 10px; letter-spacing: 0.25em;
            color: rgba(255,255,255,0.3);
            text-transform: uppercase;
            margin-top: 10px;
            position: relative; z-index: 1;
            opacity: 0;
            animation: pl-fade-in 0.6s ease 0.9s both;
          }

          /* ── Progress bar ──────────────────────────────────────────────── */
          .pl-bar-wrap {
            position: relative; z-index: 1;
            margin-top: 48px;
            width: min(280px, 70vw);
          }
          .pl-bar-header {
            display: flex; justify-content: space-between; align-items: center;
            margin-bottom: 10px;
            font-family: ui-monospace, 'SF Mono', monospace;
            font-size: 9px; letter-spacing: 0.2em;
            color: rgba(255,255,255,0.2);
            opacity: 0;
            animation: pl-fade-in 0.5s ease 0.7s both;
          }
          .pl-pct {
            color: rgba(59,130,246,0.7);
            font-variant-numeric: tabular-nums;
          }
          .pl-bar-track {
            width: 100%; height: 2px;
            background: rgba(255,255,255,0.07);
            border-radius: 2px; overflow: hidden;
            opacity: 0;
            animation: pl-fade-in 0.5s ease 0.7s both;
          }
          .pl-bar-fill {
            height: 100%;
            width: var(--pl-progress);
            background: linear-gradient(90deg, #1D4ED8, #3B82F6, #60A5FA);
            box-shadow: 0 0 12px rgba(59,130,246,0.7);
            border-radius: 2px;
            transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
          /* Leading glow dot on the fill */
          .pl-bar-fill::after {
            content: '';
            position: absolute; top: -3px; right: 0;
            width: 6px; height: 8px;
            background: #60A5FA;
            border-radius: 50%;
            box-shadow: 0 0 10px 3px rgba(96,165,250,0.9);
            opacity: 1;
          }

          /* ── Bottom tagline ────────────────────────────────────────────── */
          .pl-footer {
            position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%);
            font-family: ui-monospace, 'SF Mono', monospace;
            font-size: 9px; letter-spacing: 0.25em;
            color: rgba(255,255,255,0.12);
            white-space: nowrap;
            opacity: 0;
            animation: pl-fade-in 0.6s ease 1s both;
          }

          /* ── Loading phase (after 0.6s) — pct counter updates ──────────── */
          #preloader.pl-phase-loading .pl-pct {
            animation: pl-pct-count 0.3s ease;
          }

          /* ── Exit / reveal phase ───────────────────────────────────────── */
          #preloader.pl-phase-done {
            animation: pl-reveal 0.85s cubic-bezier(0.7, 0, 0.84, 0) forwards;
            pointer-events: none;
          }

          /* ── Keyframes ─────────────────────────────────────────────────── */
          @keyframes pl-letter-in {
            from { opacity: 0; transform: translateY(18px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes pl-fade-in {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
          @keyframes pl-orb-pulse {
            0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
            50%       { opacity: 1;   transform: translate(-50%, -50%) scale(1.08); }
          }
          @keyframes pl-blink {
            0%, 100% { opacity: 1; }
            50%       { opacity: 0.2; }
          }
          @keyframes pl-reveal {
            0%   { opacity: 1; transform: translateY(0)    scale(1);    filter: blur(0);   clip-path: inset(0 0 0 0); }
            40%  { opacity: 1; transform: translateY(-8px) scale(1.01); filter: blur(0);   clip-path: inset(0 0 0 0); }
            100% { opacity: 0; transform: translateY(-60px) scale(1.04); filter: blur(12px); clip-path: inset(0 0 100% 0); }
          }
        `}} />
      </head>
      <body className="relative bg-[var(--bg-color)] text-[var(--text-primary)] antialiased selection:bg-[#3B82F6] selection:text-white font-sans overflow-x-hidden transition-colors duration-300" style={{ overflow: 'hidden' }}>
        {/* Cinematic preloader — zero JS, renders on first paint, driven by CSS vars */}
        <div id="preloader" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-label="Loading The Automation Guys">
          {/* Corner accents */}
          <div className="pl-corner pl-corner-tl" aria-hidden="true" />
          <div className="pl-corner pl-corner-tr" aria-hidden="true" />
          <div className="pl-corner pl-corner-bl" aria-hidden="true" />
          <div className="pl-corner pl-corner-br" aria-hidden="true" />

          {/* Top status */}
          <div className="pl-status-line" aria-hidden="true">
            <div className="pl-status-dot" />
            <span>INITIALIZING SYSTEMS</span>
          </div>

          {/* Brand wordmark — letter by letter */}
          <div className="pl-logo-wrap" aria-label="The Automation Guys">
            <span className="pl-logo-the" aria-hidden="true">EST. 2025</span>
            <div className="pl-logo-letters" aria-hidden="true">
              {'AUTOMATION'.split('').map((ch, i) => (
                <span key={i} className="pl-letter">{ch}</span>
              ))}
              <span className="pl-letter space" />
              {'GUYS'.split('').map((ch, i) => (
                <span key={i + 11} className="pl-letter">{ch}</span>
              ))}
            </div>
          </div>

          {/* Tagline */}
          <div className="pl-tagline" aria-hidden="true">Operations, Rewired</div>

          {/* Progress bar */}
          <div className="pl-bar-wrap" aria-hidden="true">
            <div className="pl-bar-header">
              <span>LOADING</span>
              <span className="pl-pct" id="pl-pct-display">0%</span>
            </div>
            <div className="pl-bar-track">
              <div className="pl-bar-fill" />
            </div>
          </div>

          {/* Bottom text */}
          <div className="pl-footer" aria-hidden="true">THE AUTOMATION GUYS · theautomationguys.com</div>
        </div>

        <PreloaderDismiss />
        <ThemeProvider>
          {/* Global Background Gridlines Overlay */}
          <div
            className="fixed inset-0 pointer-events-none bg-grid-pattern z-0 opacity-100"
            aria-hidden="true"
          />
          <CustomCursor />
          <div className="relative z-10">{children}</div>
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}

