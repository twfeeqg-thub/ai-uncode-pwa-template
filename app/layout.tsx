import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google"; // سنستخدم خط Inter كخط أساسي مؤقتاً
import "./globals.css";
import config from "../config.json";

const inter = Inter({ subsets: ["latin"] });

// 1. تحديث الـ Metadata لتكون ديناميكية من config.json
export const metadata: Metadata = {
  title: config.pwa.appName,
  description: config.pwa.appDescription,
  manifest: "/manifest.ts", // الربط مع ملف المانيفست الذي سننشئه
};

// 2. إضافة Viewport للتحكم في لون الشريط العلوي للمتصفح على الهواتف
export const viewport: Viewport = {
  themeColor: config.pwa.themeColor,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 3. إضافة dir="rtl" و lang="ar" وتطبيق الخط
    <html lang="ar" dir="rtl">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
