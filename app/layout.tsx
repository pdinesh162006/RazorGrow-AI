import type { Metadata } from "next";
import { Cormorant, Montserrat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant({ subsets: ["latin"], variable: "--font-heading" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "RazorGrow E-commerce",
  description: "Premium E-commerce Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${montserrat.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
