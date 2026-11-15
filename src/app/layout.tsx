import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CurrencyProvider } from "@/context/CurrencyContext"; 
import Navbar from "@/components/Navbar"; // 👈 1. මේක එකතු කරන්න

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TALVEXA Global Exports",
  description: "Bringing the Best of Sri Lanka to the World",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <CurrencyProvider>
          <Navbar /> {/* 👈 2. මේක මෙතනට දාන්න */}
          {children}
          <WhatsAppButton />
        </CurrencyProvider>
      </body>
    </html>
  );
}