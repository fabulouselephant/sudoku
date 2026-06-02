import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/sudoku/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: true },
      manifest: {
        name: 'Sudoku',
        short_name: 'Sudoku',
        start_url: '/sudoku/',
        display: 'standalone',
        background_color: '#1c1917',
        theme_color: '#1c1917',
        icons: [
          { src: '/sudoku/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/sudoku/icons/icon-512.png', sizes: '512x512', type: 'image/png' }
        ],
        screenshots: [                                                                                                                                                                                                      
          {             
            src: '/sudoku/icons/icon-512.png',
            sizes: '512x512',                                                                                                                                                                                               
            type: 'image/png',
            form_factor: 'wide'                                                                                                                                                                                             
          },            
          {
            src: '/sudoku/icons/icon-512.png',
            sizes: '512x512',                                                                                                                                                                                               
            type: 'image/png',
            form_factor: 'narrow'                                                                                                                                                                                           
          }             
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
