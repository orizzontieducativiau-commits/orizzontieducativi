import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Caveat, Inter } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Orizzonti Educativi — Guida per educatori italiani in Australia",
    template: "%s | Orizzonti Educativi",
  },
  description:
    "Consulenze pedagogiche, mentorship e risorse per educatori italiani nel sistema educativo australiano.",
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: "Orizzonti Educativi",
    title: "Orizzonti Educativi — Guida per educatori italiani in Australia",
    description:
      "Consulenze pedagogiche, mentorship e risorse per educatori italiani nel sistema educativo australiano.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Orizzonti Educativi — Guida per educatori italiani in Australia",
    description:
      "Consulenze pedagogiche, mentorship e risorse per educatori italiani nel sistema educativo australiano.",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={GeistSans.variable}>
      <body className={`${caveat.variable} ${inter.variable} font-sans antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
