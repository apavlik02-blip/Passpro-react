import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ViteSitemap from 'vite-plugin-sitemap' // 1. Import the plugin

export default defineConfig({
  plugins: [
    react(),
    ViteSitemap({ // 2. Add the dynamic sitemap settings
      hostname: 'https://passpro-react.vercel.app', // Swap out with custom domain later
      readable: true,
      routes: [
        '/',
        '/blog',
        '/blog/how-hard-is-the-wisconsin-insurance-exam',
        '/blog/wisconsin-insurance-exam-practice-questions',
        '/blog/wisconsin-life-health-insurance-license-guide'
      ]
    })
  ]
})

