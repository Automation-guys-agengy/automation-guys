import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from '@/components/ThemeProvider'
import { CustomCursor } from '@/components/CustomCursor'
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
      </head>
      <body className="relative bg-[var(--bg-color)] text-[var(--text-primary)] antialiased selection:bg-[#3B82F6] selection:text-white font-sans overflow-x-hidden transition-colors duration-300">
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
