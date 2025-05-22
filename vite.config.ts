import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
import fs from 'fs'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import compression from 'vite-plugin-compression2'

// Verificar si estamos en un entorno CI/CD (como Fly.io)
const isCI = process.env.CI === 'true' || process.env.FLY_APP_NAME !== undefined;

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 8080,
    strictPort: true,
  },
  plugins: [
    react(), 
    tailwindcss(),
    ...(!isCI ? [
      ViteImageOptimizer({
        png: {
          quality: 70,
          compressionLevel: 9,
        },
        jpeg: {
          quality: 70,
        },
        jpg: {
          quality: 70,
        },
        webp: {
          lossless: false,
          quality: 80,
        },
        avif: {
          lossless: false,
          quality: 80,
        },
        cache: true,
        cacheLocation: path.resolve(__dirname, 'node_modules/.vite/image-optimizer-cache'),
        includePublic: true,
        test: /\.(jpe?g|png|gif|webp|svg)$/i,
      })
    ] : []),
    compression({
      algorithm: 'gzip',
      exclude: [/\.(br)$/, /\.(gz)$/],
      threshold: 1024,
    }),
    compression({
      algorithm: 'brotliCompress',
      exclude: [/\.(br)$/, /\.(gz)$/],
      threshold: 1024,
    }),
    {
      name: 'ignore-missing-vite-svg',
      configureServer() {
        if (!fs.existsSync('public/vite.svg')) {
          fs.writeFileSync('public/vite.svg', '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"></svg>');
        }
      }
    }
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: 'esbuild',
    
    assetsInlineLimit: 0,
    
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2,
        ecma: 2020,
        toplevel: true,
      },
      mangle: {
        toplevel: true,
        safari10: false,
      },
      output: {
        comments: false
      }
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor.react';
            }
            
            const packageName = id.toString().split('node_modules/')[1].split('/')[0].toString();
            if (['i18next', 'react-i18next', 'lucide-react', 'swiper'].includes(packageName)) {
              return `vendor.${packageName}`;
            }
            return 'vendor';
          }
        },
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return 'assets/[name]-[hash][extname]';
          
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(assetInfo.name)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          
          if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      }
    },
    reportCompressedSize: true,
    chunkSizeWarningLimit: 500,
    modulePreload: {
      polyfill: true
    },
    sourcemap: false,
    
  }
})
