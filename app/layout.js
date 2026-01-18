import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Providers from "./providers"

export const metadata = {
  title: "QR Maker",
  description: "UPI QR Code Generator",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
