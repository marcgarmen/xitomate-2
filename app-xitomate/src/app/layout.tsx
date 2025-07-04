import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import HeaderLoader from '@/components/Headers/HeaderLoader'
import { AuthProvider } from '@/context/AuthContext'
import ToastProvider from '@/components/toast/ToastProvider'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Xitomate',
  description: 'Generated by create next app',
  icons: {
    icon: '/restaurante-icon.svg'
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <ToastProvider>
            <HeaderLoader />
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  )
}