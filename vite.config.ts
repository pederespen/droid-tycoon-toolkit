import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  // Served from a GitHub Pages project page at /droid-tycoon-toolkit/ in
  // production; root in dev.
  base: process.env.NODE_ENV === 'production' ? '/droid-tycoon-toolkit/' : '/',
  plugins: [tailwindcss(), svelte()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      $lib: fileURLToPath(new URL('./src/lib', import.meta.url)),
    },
  },
})
