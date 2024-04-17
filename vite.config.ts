import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';

const pathResolve = (path: string): string => resolve(process.cwd(), path);

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/memoo-interface/' : './',
  // base: '/',
  envDir: './env',
  publicDir: process.env.NODE_ENV === 'production' ? '/memoo-interface/' : 'public',
  resolve: {
    alias: {
      '@': pathResolve('src'),
      '#': pathResolve('types'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/styles/mixin.scss";',
      },
    },
    modules: {
      localsConvention: 'camelCaseOnly',
    },
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  plugins: [
    react(),
    eslint(),
    visualizer({ open: false }),
    {
      ...viteCompression(),
      apply: 'build',
    },
  ],
  build: {
    target: ['esnext'],
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          rainbowkit: ['@rainbow-me/rainbowkit'],
        },
      },
    },
  },
});
