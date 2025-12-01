import { MetadataRoute } from 'next'
import config from '../config.json'

export default function manifest(): MetadataRoute.Manifest {
  const { pwa } = config;

  return {
    name: pwa.appName,
    short_name: pwa.appShortName,
    description: pwa.appDescription,
    start_url: '/',
    display: 'standalone',
    background_color: pwa.backgroundColor,
    theme_color: pwa.themeColor,
    icons: [
      {
        src: '/favicon.ico', // يمكنك تغييره لاحقاً
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192x192.png', // سنضيف هذه الأيقونات لاحقاً
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/icon-512x512.png', // سنضيف هذه الأيقونات لاحقاً
        sizes: '512x512',
        type: 'image/png'
      }
    ],
  }
}
