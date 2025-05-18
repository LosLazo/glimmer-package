import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      include: ['src/components/', 'src/index.ts'],
      exclude: ['src/components/*/stories', 'src/**/*.stories.ts'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'GlimmerPackage',
      formats: ['es', 'cjs'],
      fileName: format => `glimmer-package.${format === 'es' ? 'mjs' : 'js'}`,
    },
    rollupOptions: {
      external: ['vue', /\.stories\.(t|j)sx?$/],
      output: {
        globals: {
          vue: 'Vue',
        },
        exports: 'named',
      },
    },
    cssCodeSplit: true,
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '~': resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    exclude: ['src/components/*/stories']
  }
}); 