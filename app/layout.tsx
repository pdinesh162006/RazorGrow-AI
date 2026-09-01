import type { Metadata } from "next";
import { Cormorant, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';

const cormorant = Cormorant({ subsets: ["latin"], variable: "--font-heading" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "RazorGrow E-commerce",
  description: "Premium E-commerce Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${montserrat.variable} font-body antialiased bg-background text-foreground min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <ChatWidget />
      </body>
    </html>
  );
}
