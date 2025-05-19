import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import fs from 'fs-extra';
import type { PreRenderedAsset } from 'rollup';

// Helper to copy directory recursively
async function copyDir(src: string, dest: string): Promise<void> {
  await fs.copy(src, dest, {
    filter: (srcPath: string) => !srcPath.includes('.DS_Store')
  });
}

export default defineConfig({
  plugins: [
    vue({
      // Enable template compilation for SFCs
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('-')
        }
      }
    }),
    dts({
      insertTypesEntry: true,
      include: ['src/components/', 'src/index.ts'],
      exclude: ['src/components/*/stories', 'src/**/*.stories.ts'],
      beforeWriteFile: (filePath, content) => {
        return {
          filePath: filePath.replace('/dist/', '/dist/types/'),
          content
        };
      }
    }),
    {
      name: 'copy-files',
      async writeBundle() {
        // Copy all directories from src
        const srcDirs = ['styles', 'components', 'assets', 'utils', 'types'];
        
        for (const dir of srcDirs) {
          const srcPath = resolve(__dirname, `src/${dir}`);
          if (await fs.pathExists(srcPath)) {
            await copyDir(
              srcPath,
              resolve(__dirname, `dist/${dir}`)
            );
          }
        }
      }
    }
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'GlimmerPackage',
      formats: ['es', 'cjs'],
      fileName: (format) => `glimmer-package.${format}.js`
    },
    rollupOptions: {
      external: ['vue', /\.stories\.(t|j)sx?$/],
      output: {
        globals: {
          vue: 'Vue'
        },
        exports: 'named',
        assetFileNames: (assetInfo: PreRenderedAsset): string => {
          if (assetInfo.name === 'style.css') {
            return 'styles/index.css';
          }
          return assetInfo.name || 'unknown';
        }
      }
    },
    cssCodeSplit: false,
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: true
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '~': resolve(__dirname, 'src')
    },
    // Add support for resolving SFCs from node_modules
    dedupe: ['vue'],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  optimizeDeps: {
    exclude: ['src/components/*/stories'],
    include: ['vue']
  },
  ssr: {
    // SSR-specific optimizations
    noExternal: ['glimmer-package'],
    target: 'node'
  }
}); 