import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans, Electrolize } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import LanguageProvider from "@/components/LanguageProvider";
import 'highlight.js/styles/github-dark.css';
import '@/lib/suppress-hydration-warnings';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const electrolize = Electrolize({
  variable: "--font-electrolize",
  subsets: ["latin"],
  weight: ["400"],
});

const noto = Noto_Sans({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ray Yang - Professional Technical Services",
  description: "Professional teaching, consulting, and system development services. Helping you achieve technical goals and business growth.",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${electrolize.variable} ${noto.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </Providers>
      </body>
    </html>
  );
}
