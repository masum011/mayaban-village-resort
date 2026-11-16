import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { visualizer } from 'rollup-plugin-visualizer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode, isSsrBuild }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const mapsApiKey =
    env.VITE_GOOGLE_MAPS_API_KEY ||
    env.GOOGLE_MAPS_API_KEY ||
    process.env.VITE_GOOGLE_MAPS_API_KEY ||
    process.env.GOOGLE_MAPS_API_KEY ||
    '';
  const isAnalyze = process.env.ANALYZE === 'true';

  return {
    define: mapsApiKey
      ? {
          'import.meta.env.VITE_GOOGLE_MAPS_API_KEY': JSON.stringify(mapsApiKey),
        }
      : undefined,
    plugins: [
      react(),
      tailwindcss(),
      isSsrBuild && {
        name: 'ssr-virtual-pwa-stub',
        resolveId(id) {
          if (id === 'virtual:pwa-register') return '\0virtual:pwa-register';
          return null;
        },
        load(id) {
          if (id === '\0virtual:pwa-register') {
            return 'export function registerSW() { return () => Promise.resolve(); }';
          }
          return null;
        },
      },
      !isSsrBuild &&
        VitePWA({
          registerType: 'prompt',
          injectRegister: null,
          manifest: false, // Served from /public/site.webmanifest
          workbox: {
            // Precache app shell only; cache visited responsive AVIF/WebP images at runtime
            globPatterns: [
              '**/*.{js,css,html,ico,svg,woff2}',
              'favicon-32x32.png',
              'apple-touch-icon.png',
              'pwa-*.png',
              'assets/mayaban-logo.png',
            ],
            globIgnores: ['**/video/**', '**/aistudio/**', 'images/**', 'og-image.jpg'],
            maximumFileSizeToCacheInBytes: 2 * 1024 * 1024,
            navigateFallback: '/offline.html',
            navigateFallbackDenylist: [
              /^\/api/,
              /\.(?:png|jpg|jpeg|svg|webp|avif|mp4|webm|xml|txt|webmanifest|ico)$/,
            ],
            runtimeCaching: [
              {
                urlPattern: /\.(?:avif|webp|png|jpg|jpeg|svg|woff2)$/i,
                handler: 'CacheFirst',
                options: {
                  cacheName: 'mayaban-media-fonts-v1',
                  expiration: {
                    maxEntries: 100,
                    maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                  },
                  cacheableResponse: {
                    statuses: [0, 200],
                  },
                },
              },
              {
                urlPattern: /\.json$/i,
                handler: 'StaleWhileRevalidate',
                options: {
                  cacheName: 'mayaban-data-v1',
                  expiration: {
                    maxEntries: 30,
                    maxAgeSeconds: 60 * 60 * 24 * 7,
                  },
                },
              },
              {
                urlPattern: ({ request }) => request.mode === 'navigate',
                handler: 'NetworkFirst',
                options: {
                  cacheName: 'mayaban-pages-v1',
                  networkTimeoutSeconds: 4,
                  expiration: {
                    maxEntries: 25,
                    maxAgeSeconds: 60 * 60 * 24 * 7,
                  },
                },
              },
            ],
          },
        }),
      !isSsrBuild &&
        isAnalyze &&
        visualizer({
          filename: 'dist/stats.html',
          open: false,
          gzipSize: true,
          brotliSize: true,
        }),
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    build: {
      target: 'es2020',
      cssCodeSplit: true,
      minify: 'esbuild',
      rollupOptions: isSsrBuild
        ? undefined
        : {
            output: {
              entryFileNames: 'assets/[name]-[hash].js',
              chunkFileNames: 'assets/[name]-[hash].js',
              assetFileNames: 'assets/[name]-[hash].[ext]',
              manualChunks(id) {
                if (id.includes('node_modules')) {
                  if (id.includes('@vis.gl/react-google-maps')) return 'maps-vendor';
                  if (id.includes('framer-motion') || id.includes('/motion/')) return 'motion-vendor';
                  if (id.includes('gsap') || id.includes('lenis')) return 'gsap-vendor';
                  if (id.includes('@radix-ui')) return 'ui-vendor';
                  if (
                    id.includes('react-router') ||
                    id.includes('/react-dom/') ||
                    id.includes('/react/')
                  ) {
                    return 'react-vendor';
                  }
                }
              },
            },
          },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
