import './globals.css'
import { Inter, Poppins, Nunito, Quicksand } from 'next/font/google'
import StatusDashboard from './components/StatusDashboard'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins'
})
const nunito = Nunito({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-nunito'
})
const quicksand = Quicksand({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-quicksand'
})

export const metadata = {
  title: 'AI Quiz Hub - AI-Powered Interactive Learning',
  description: 'Take engaging quizzes on any topic with AI-generated questions. Challenge yourself with intelligent, adaptive learning experiences.',
  keywords: 'AI quiz, interactive learning, education, artificial intelligence, quiz generator, learning platform',
  authors: [{ name: 'Saptarshi Ghosh' }],
  creator: 'Saptarshi Ghosh',
  publisher: 'AI Quiz Hub',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16', type: 'image/x-icon' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#6366f1',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${nunito.variable} ${quicksand.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.ico" sizes="16x16" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme and Meta */}
        <meta name="theme-color" content="#6366f1" />
        <meta name="color-scheme" content="dark" />
        <meta name="msapplication-TileColor" content="#6366f1" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={`${inter.className} bg-dark-900 min-h-screen overflow-hidden`}>
        {children}
      </body>
    </html>
  )
}