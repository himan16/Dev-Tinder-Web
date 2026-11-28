import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // The app calls the API under /devTinder. In production nginx strips that prefix and forwards
      // to the backend; this does the same during `npm run dev`, so the cookie stays same-origin.
      '/devTinder': {
        target: 'http://localhost:7777',
        rewrite: (path) => path.replace(/^\/devTinder/, ''),
      },
    },
  },
})
