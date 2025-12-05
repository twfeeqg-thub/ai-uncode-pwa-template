// manifest.ts
import { MetadataRoute } from 'next'
import config from './config.json'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: config.pwa.appName,
    short_name: config.pwa.appShortName,
    description: config.pwa.appDescription,
    start_url: '/home', // <-- النقطة السحرية: يبدأ التطبيق من هنا بعد التثبيت
    display: 'standalone',
    background_color: config.pwa.backgroundColor,
    theme_color: config.pwa.themeColor,
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
