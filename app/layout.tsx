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
          #preloader {
            position: fixed; inset: 0; z-index: 99999;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            background: #0a0a0a;
            transition: opacity 0.6s ease, transform 0.6s ease, filter 0.6s ease;
          }
          #preloader.preloader-exit {
            opacity: 0; transform: translateY(-30px); filter: blur(8px);
            pointer-events: none;
          }
          .pl-spinner {
            position: relative; width: 80px; height: 80px; margin-bottom: 32px;
          }
          .pl-ring-outer {
            position: absolute; inset: 0; border-radius: 50%;
            border: 2px solid transparent; border-top-color: #3B82F6;
            animation: pl-spin 1.8s linear infinite;
          }
          .pl-ring-inner {
            position: absolute; inset: 10px; border-radius: 50%;
            border: 2px solid transparent; border-bottom-color: rgba(255,255,255,0.7);
            animation: pl-spin 1.4s linear infinite reverse;
          }
          .pl-dot {
            position: absolute; top: 50%; left: 50%;
            width: 10px; height: 10px; margin: -5px 0 0 -5px;
            border-radius: 50%; background: #3B82F6;
            box-shadow: 0 0 14px #3B82F6;
            animation: pl-pulse 1.5s ease-in-out infinite;
          }
          .pl-title {
            font-size: 13px; letter-spacing: 0.3em; color: #ffffff;
            font-weight: 700; font-family: system-ui, -apple-system, sans-serif;
          }
          .pl-sub {
            font-size: 11px; letter-spacing: 0.2em; color: #71717a;
            font-weight: 500; margin-top: 8px;
            font-family: system-ui, -apple-system, sans-serif;
            animation: pl-fade-in 0.5s ease 0.3s both;
          }
          .pl-bar-track {
            width: 180px; height: 2px; background: #27272a;
            border-radius: 2px; overflow: hidden; margin-top: 40px;
          }
          .pl-bar-fill {
            height: 100%; width: 0; background: #3B82F6;
            box-shadow: 0 0 10px #3B82F6;
            animation: pl-progress 2.5s ease-in-out forwards;
          }
          @keyframes pl-spin { to { transform: rotate(360deg); } }
          @keyframes pl-pulse {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.25); opacity: 1; }
          }
          @keyframes pl-progress { to { width: 100%; } }
          @keyframes pl-fade-in { from { opacity: 0; } to { opacity: 1; } }
        `}} />
      </head>
      <body className="relative bg-[var(--bg-color)] text-[var(--text-primary)] antialiased selection:bg-[#3B82F6] selection:text-white font-sans overflow-x-hidden transition-colors duration-300" style={{ overflow: 'hidden' }}>
        {/* Pure HTML/CSS preloader — zero JS, renders on first paint */}
        <div id="preloader" aria-hidden="true">
          <div className="pl-spinner">
            <div className="pl-ring-outer" />
            <div className="pl-ring-inner" />
            <div className="pl-dot" />
          </div>
          <div className="pl-title">THE AUTOMATION GUYS</div>
          <div className="pl-sub">INITIALIZING SYSTEMS...</div>
          <div className="pl-bar-track">
            <div className="pl-bar-fill" />
          </div>
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

