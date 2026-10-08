import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChatWidget } from "@/components/ai/AIChatWidget";

export const metadata: Metadata = {
  title: "Gevora — Property Portal for Sri Lanka",
  description:
    "Search houses, apartments, land and commercial property for sale and rent across Sri Lanka. Verified listings, suburb price data, and licensed agents in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-sand font-sans text-ink">
        <ThemeProvider>
          <QueryProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <AIChatWidget />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
