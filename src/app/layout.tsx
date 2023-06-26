import './globals.css'
import type { PropsWithChildren } from 'react'
import { Inter } from 'next/font/google'
import Provider from '@/components/Provider'
import { RootStyleRegistry } from './antd'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SoyMomo CS Platform',
  description: 'Soymomo CS Platform for customer support',
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head />
        <body>
          <Provider>
            <RootStyleRegistry>{children}</RootStyleRegistry>
          </Provider>
        </body>
    </html>
  )
}
