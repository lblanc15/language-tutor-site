import type { Metadata } from "next";
import { Libre_Caslon_Text, Manrope } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const libreCaslonText = Libre_Caslon_Text({
  weight: "400",
  variable: "--font-libre-caslon-text",
  subsets: ["latin"],
});

const manrope = Manrope({
  weight: "400",
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Academia de Español Rico | Online Spanish Classes for Filipino Learners',
  description: 'Practical online Spanish classes tailored for Filipino learners. Master A1-A2 Spanish with live classes, expert instructors, and flexible schedules.',
  keywords: ['Learn Spanish Philippines', 'Online Spanish Classes Manila', 'BPO Spanish Bilingual', 'Academia de Espanol Rico'],
  alternates: {
    canonical: 'https://ricospanishacademy.com',
  },
  openGraph: {
    title: 'Academia de Español Rico - Learn Spanish Today',
    description: 'Practical online Spanish classes tailored for Filipino learners.',
    url: 'https://ricospanishacademy.com',
    siteName: 'Academia de Español Rico',
    locale: 'en_PH',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", libreCaslonText.variable, manrope.variable, "font-sans")}
    >
      <body className="min-h-full overflow-x-hidden">{children}</body>
    </html>
  );
}
