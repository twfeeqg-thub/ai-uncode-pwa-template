import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import config from "../config.json";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: config.pwa.appName,
  description: config.pwa.appDescription,
  manifest: "/manifest.ts",
  // --- التعديل هنا: إضافة قسم الأيقونات لربط أيقونة Apple ---
  icons: {
    icon: "/favicon.ico", // الأيقونة الأساسية للمتصفح (موجودة افتراضياً)
    apple: "/apple-icon.png", // أيقونة خاصة بأجهزة آبل (التي أنشأناها)
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
