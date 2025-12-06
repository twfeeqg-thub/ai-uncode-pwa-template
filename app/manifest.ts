// File: manifest.ts (النسخة النهائية والمضمونة)

import { MetadataRoute } from 'next'

// تم إزالة "import config from './config.json'"
// تم كتابة القيم مباشرة لتجنب أخطاء البناء

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "تطبيق أيكود", // مأخوذة من config.pwa.appName
    short_name: "أيكود", // مأخوذة من config.pwa.appShortName
    description: "تطبيقنا الرسمي للحصول على آخر العروض والإشعارات.", // مأخوذة من config.pwa.appDescription
    start_url: '/home',
    display: 'standalone',
    background_color: "#FFFFFF", // مأخوذة من config.pwa.backgroundColor
    theme_color: "#0A0A0A", // مأخوذة من config.pwa.themeColor
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}

