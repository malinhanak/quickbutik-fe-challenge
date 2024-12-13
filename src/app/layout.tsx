import { Instructions } from '@/components/Instructions'
import { Header } from '@/components/Layout/Header/Header'
import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
})

const futuraPT = localFont({
  src: '../../public/fonts/FuturaCyrillicBold.woff',
  display: 'swap',
  variable: '--font-title',
})

export const metadata: Metadata = {
  title: 'Test Case Quickbutik',
  description: 'Generated by create next app',
}

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode
  }>,
) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </head>
      <body className={[manrope.className, futuraPT.variable].join(' ')}>
        <Header />

        <div className="container mx-auto flex gap-8">
          <main className="py-8 flex-1">
            <div className="container mx-auto">{props.children}</div>
          </main>

          <Instructions />
        </div>
      </body>
    </html>
  )
}
