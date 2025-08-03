import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
})

export const metadata: Metadata = {
  title: "NGooning - AI Social Recovery & Lifestyle Planner",
  description: "Help young people stop watching porn, rebuild their lives, make new friends, plan real-world experiences, and form better habits with AI assistance.",
  keywords: [
    "social recovery",
    "lifestyle planner", 
    "AI assistant",
    "habit tracker",
    "social networking",
    "trip planning",
    "calendar sync",
    "mental health",
    "personal development"
  ],
  authors: [{ name: "NGooning Team" }],
  creator: "NGooning",
  publisher: "NGooning",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://ngooning.com",
    title: "NGooning - AI Social Recovery & Lifestyle Planner",
    description: "Transform your life with AI-powered social recovery and lifestyle planning",
    siteName: "NGooning",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NGooning - AI Social Recovery & Lifestyle Planner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NGooning - AI Social Recovery & Lifestyle Planner",
    description: "Transform your life with AI-powered social recovery and lifestyle planning",
    images: ["/og-image.png"],
    creator: "@ngooning",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "NGooning",
  },
  formatDetection: {
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#667eea" />
        <meta name="msapplication-TileColor" content="#667eea" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
