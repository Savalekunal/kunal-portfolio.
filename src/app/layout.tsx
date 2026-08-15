import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { profile } from "@/lib/data";

const siteUrl = "https://kunal-savale-qa.vercel.app"; // update once deployed to your real domain

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kunal Savale — QA Automation Engineer / SDET",
    template: "%s — Kunal Savale",
  },
  description:
    "Kunal Savale is a QA Automation Engineer / SDET with 4+ years of experience in Playwright, Selenium, API testing, CI/CD, and GenAI/RAG platform testing.",
  keywords: [
    "QA Automation Engineer",
    "SDET",
    "Playwright Automation Engineer",
    "Python Automation Tester",
    "Selenium Automation Engineer",
    "GenAI Testing",
    "RAG Testing",
    "AI Testing",
    "API Testing",
    "Test Automation Engineer",
    "Kunal Savale",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    title: "Kunal Savale — QA Automation Engineer / SDET",
    description:
      "4+ years of experience in QA automation, UI/API testing, CI/CD, and testing modern GenAI/RAG applications.",
    url: siteUrl,
    siteName: "Kunal Savale — QA Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kunal Savale — QA Automation Engineer / SDET",
    description:
      "4+ years of experience in QA automation, UI/API testing, CI/CD, and testing modern GenAI/RAG applications.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "QA Automation Engineer / SDET",
  description: profile.intro,
  email: `mailto:${profile.email}`,
  url: siteUrl,
  sameAs: [profile.links.linkedin, profile.links.github],
  knowsAbout: [
    "Test Automation",
    "Playwright",
    "Selenium WebDriver",
    "API Testing",
    "CI/CD",
    "GenAI Testing",
    "RAG Testing",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <MotionConfig reducedMotion="user">
          <ThemeProvider>
            <a href="#main" className="skip-link">
              Skip to main content
            </a>
            {children}
          </ThemeProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
