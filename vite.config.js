import { defineConfig } from 'vite';
import createVuePlugin from '@vitejs/plugin-vue'
import envCompatible from 'vite-plugin-env-compatible';
import { injectHtml } from 'vite-plugin-html';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import { VitePWA } from 'vite-plugin-pwa';
import { reduce } from 'ramda';

const proxyConfig = {
  target: 'http://localhost:80',
  changeOrigin: true,
  secure: false,
};

const proxyPaths = reduce((obj, path) => ({ ...obj, [path]: proxyConfig, }), {});

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: 'vue',
        replacement: '@vue/compat',
      },
      {
        find: /^~/,
        replacement: '',
      },
    ],
    extensions: [
      '.mjs',
      '.js',
      '.ts',
      '.jsx',
      '.tsx',
      '.json',
      '.vue',
    ]
  },
  plugins: [
    createVuePlugin({ jsx: true,
      template: {
        compilerOptions: {
          compatConfig: {
            MODE: 3,
          },
        },
      },
    }),
    viteCommonjs(),
    envCompatible(),
    injectHtml(),
    VitePWA({
      filename: 'service-worker.js',
      manifest: false,
      injectRegister: false,
      workbox: {
        runtimeCaching: [{
          urlPattern: /.*\.(?:js|css)$/,
          handler: 'StaleWhileRevalidate',
        }],
        globIgnores: ['_redirects'],
      },
    }),
  ],
  build: {},
  optimizeDeps: {
    exclude: ['@farmos.org/farmos-map'],
  },
  server: {
    port: 8080,
    proxy: proxyPaths([
      '/api',
      '/oauth',
      '/farm/client',
    ]),
  },
});