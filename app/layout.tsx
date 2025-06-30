import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme/theme-provider"

export const metadata: Metadata = {
  title: "RIDCorix - Software Developer Portfolio",
  description: "Modern personal portfolio website showcasing projects, skills, and professional experience. Built with Next.js 14+ and shadcn/ui.",
  keywords: ["software developer", "programmer", "web development", "technology", "portfolio", "Next.js", "React"],
  authors: [{ name: "RIDCorix" }],
  creator: "RIDCorix",
  openGraph: {
    title: "RIDCorix - Software Developer Portfolio",
    description: "Explore my projects, skills, and professional journey in software development.",
    type: "website",
    url: "https://ridcorix.github.io/RIDCorix/",
    siteName: "RIDCorix Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "RIDCorix - Software Developer Portfolio",
    description: "Explore my projects, skills, and professional journey in software development.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
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