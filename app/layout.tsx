import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from '@/components/ThemeProvider'
import { CustomCursor } from '@/components/CustomCursor'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Automation Guys — Operations, rewired',
  description:
    'We turn the manual work slowing ambitious teams down into an intelligent operating system. High-performance AI automation agency.',
  keywords: [
    'AI automation',
    'operations agency',
    'workflow automation',
    'CRM integration',
    'process automation',
    'intelligent operating systems',
  ],
  authors: [{ name: 'The Automation Guys' }],
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'The Automation Guys — Operations, rewired',
    description:
      'We turn the manual work slowing ambitious teams down into an intelligent operating system.',
    url: 'https://theautomationguys.com',
    siteName: 'The Automation Guys',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Automation Guys — Operations, rewired',
    description:
      'We turn manual work into intelligent operating systems for ambitious teams.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
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
