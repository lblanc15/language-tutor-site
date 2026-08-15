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
  title: "Academia de Español Rico",
  description: "Spanish language tutor site",
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
