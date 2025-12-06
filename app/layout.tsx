// app/layout.tsx

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import config from "../config.json";
import { ClientProviders } from "./providers"; // --- جديد: استيراد المكون الوسيط

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: config.pwa.appName,
  description: config.pwa.appDescription,
  manifest: "/manifest.webmanifest", // تعديل المسار ليكون متوافقًا مع Vercel
  icons: {
    icon: "/favicon.ico",
    apple: "/public/apple-icon.png", // تعديل المسار ليكون صحيحًا
  },
};

export const viewport: Viewport = {
  themeColor: config.pwa.themeColor,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={inter.className}>
        {/* --- جديد: تغليف المحتوى بـ ClientProviders --- */}
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
