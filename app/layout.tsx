import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fredoka, Nunito } from 'next/font/google'
import './globals.css'

const fredoka = Fredoka({ subsets: ['latin'], variable: '--font-fredoka', weight: ['400', '500', '600', '700'] })
const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' })

export const metadata: Metadata = {
  title: '¡Mis 8 Años! | Mia Marvely Magaña Leal',
  description:
    'Acompáñame a festejar los 8 años de Mia Marvely Magaña Leal en Aqua Park Palín, Escuintla. 20 de diciembre de 2026.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#f2fbfb',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${fredoka.variable} ${nunito.variable} bg-background`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
