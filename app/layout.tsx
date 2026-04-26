import {Inter} from "next/font/google"
import './globals.css'


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Quiosco Next.js',
  description: 'Quiosco de comida con Next.js App Router',
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
