import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AccessibilityToolbar } from "@/components/accessibility/accessibility-toolbar";
import { KeyboardShortcutsProvider } from "@/components/accessibility/keyboard-shortcuts-provider";
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
  title: "SkillSwap - Learn from Your Neighbors",
  description: "Discover, book, and pay for micro-lessons and help from verified locals within walking distance. Turn your neighborhood into a learning campus.",
  keywords: ["SkillSwap", "community learning", "local skills", "neighborhood education", "skill sharing", "micro-lessons", "local tutors"],
  authors: [{ name: "SkillSwap Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "SkillSwap - Learn from Your Neighbors",
    description: "Discover, book, and pay for micro-lessons and help from verified locals within walking distance.",
    url: "https://skillswap.example.com",
    siteName: "SkillSwap",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillSwap - Learn from Your Neighbors",
    description: "Discover, book, and pay for micro-lessons and help from verified locals within walking distance.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#hsl(var(--background))" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <KeyboardShortcutsProvider>
            <div id="skip-nav" className="sr-only">
              <a 
                href="#main-content" 
                className="block py-2 px-4 bg-primary text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                Skip to main content
              </a>
            </div>
            <main id="main-content">
              {children}
            </main>
            <AccessibilityToolbar />
            <Toaster />
          </KeyboardShortcutsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
