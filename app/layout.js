import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "QR Maker",
  description: "UPI QR Code Generator",
};

export default function RootLayout({ children }) {
  // 🚀 Hide header/footer for auth pages
  const isAuthPage =
    typeof window !== "undefined" &&
    (window.location.pathname.startsWith("/auth/login") ||
      window.location.pathname.startsWith("/auth/signup") ||
      window.location.pathname.startsWith("/auth/reset-password"));

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Show Navbar only when NOT on auth pages */}
        {!isAuthPage && <Navbar />}

        <main className="min-h-screen">{children}</main>

        {/* Show Footer only when NOT on auth pages */}
        {!isAuthPage && <Footer />}
      </body>
    </html>
  );
}

