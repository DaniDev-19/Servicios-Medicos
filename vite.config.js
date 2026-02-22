import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


export default defineConfig({
  plugins: [react()],
  base: '/',

  // Configuración del servidor de desarrollo
  server: {
    host: true,
    port: 5173,
    open: false,
    cors: true,
    allowedHosts: true,
  },

  // Configuración de build para producción
  build: {
    outDir: 'dist',
    sourcemap: false, // Cambiar a true si necesitas source maps para debugging
    minify: 'esbuild',
    target: 'es2015',

    // Optimización de chunks para mejor caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar vendor chunks para mejor caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'chart-vendor': ['chart.js', 'react-chartjs-2'],
          'pdf-vendor': ['jspdf', 'jspdf-autotable', 'react-pdf'],
          'utils': ['axios', 'jwt-decode', 'uuid'],
        },
        // Nombres de archivos con hash para cache busting
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      }
    },

    // Configuración de optimización
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    assetsInlineLimit: 4096, // 4kb - archivos menores se incluyen inline
  },

  // Optimización de dependencias
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'axios'],
  }
})
