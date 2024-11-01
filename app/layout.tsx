import {Inter} from "next/font/google"
import './globals.css'


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Quiosco Next.js con App Router y Prisma',
  description: 'Quiosco Next.js con App Router y Prisma',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`}>{children}</body>
    </html>
  )
}