import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ajibade Hassan — Full-Stack Developer & AI Engineer",
  description:
    "Portfolio of Ajibade Hassan, a Full-Stack Web Developer and AI Engineer building modern, AI-powered web applications with React, Next.js, TypeScript, Django, and LLM tooling.",
  keywords: [
    "Ajibade Hassan",
    "Full-Stack Developer",
    "AI Engineer",
    "Web Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Django",
    "LLM",
    "Portfolio",
  ],
  authors: [{ name: "Ajibade Hassan" }],
  openGraph: {
    title: "Ajibade Hassan — Full-Stack Developer & AI Engineer",
    description: "Building modern, AI-powered web applications with React, Next.js, TypeScript, and Django.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajibade Hassan — Full-Stack Developer & AI Engineer",
    description: "Building modern, AI-powered web applications with React, Next.js, TypeScript, and Django.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <SonnerToaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
