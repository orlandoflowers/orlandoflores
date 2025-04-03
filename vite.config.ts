import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
import fs from 'fs'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import compression from 'vite-plugin-compression2'

// Verificar si estamos en un entorno CI/CD (como Fly.io)
const isCI = process.env.CI === 'true' || process.env.FLY_APP_NAME !== undefined;

// ¡La biblia de Vite po! Léela como si fuera el Copihue de los feriados 📚
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    // Solo usamos el optimizador de imágenes en desarrollo local
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
    // ¡Compresor GZIP po! Aplastando bytes como sopaipillas en invierno 🥟
    compression({
      algorithm: 'gzip',
      exclude: [/\.(br)$/, /\.(gz)$/],
      threshold: 1024,
    }),
    // ¡Compresor Brotli! Es como el GZIP pero con título en la PUC 👨‍🎓
    compression({
      algorithm: 'brotliCompress',
      exclude: [/\.(br)$/, /\.(gz)$/],
      threshold: 1024,
    }),
    {
      name: 'ignore-missing-vite-svg',
      configureServer() {
        // Creando un SVG fantasma - como hacer un mono de nieve en el Cajón del Maipo ⛄
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
    // ¡Pasando JavaScript por la juguera! Queda más molido que palta pal pan 🥤
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2, // Doble pasada, como cuando te revisai los dientes después del asado 🦷
        ecma: 2020, // Tan moderno que hasta tiene cuenta en TikTok 📱
        toplevel: true, // Reducción de scope como cuando achicai la once pa' ahorrar plata 🧃
      },
      mangle: {
        toplevel: true,
        safari10: false,
      },
      output: {
        comments: false
      }
    },
    // ¡Operación divide y vencerás! Separando código como cuando ordenai las lucas en sobres 💰
    rollupOptions: {
      output: {
        // Estrategia de división cuática - como cortar la torta pa' que alcance pa' todos 🍰
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Creando chunks por paquete - como tener la feria pero en carpetas ordenaditas 🏪
            const packageName = id.toString().split('node_modules/')[1].split('/')[0].toString();
            if (['react', 'react-dom', 'i18next', 'react-i18next', 'lucide-react', 'swiper'].includes(packageName)) {
              return `vendor.${packageName}`;
            }
            // Agrupando paquetes chicos - como juntar las chauchas en la alcancía 🐷
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
    // ¡Compresión de archivos! Metiendo tu código en una maleta como pa' irte al sur 🧳
    reportCompressedSize: true,
    chunkSizeWarningLimit: 500, // Alarma anti-guata pa' chunks muy gorditos 🚨
    // ¡Generando preloads! Como dejar el pan tostado listo pa' cuando te levantai 🍞
    modulePreload: {
      polyfill: true
    },
    // ¿Sourcemaps pa' producción? No po, somos terrible piola en nuestros secretos 🕶️
    sourcemap: false, // Como las recetas de la abuela, no se comparten ni con palos 👵
    // ¡Optimizando tallas! Convertimos archivos chicos a base64, como magia de cumpleaños 🎩
    assetsInlineLimit: 4096, // Si pesa menos que un meme del presidente, lo convertimos a base64
  }
})
