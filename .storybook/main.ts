import type { StorybookConfig } from '@storybook/vue3-vite';
import { mergeConfig } from 'vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/components/*/*.stories.@(ts|js|jsx|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    check: false,
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
        },
      },
      optimizeDeps: {
        include: ['@storybook/vue3']
      },
      build: {
        sourcemap: true,
        rollupOptions: {
          external: ['vue'],
          output: {
            manualChunks(id) {
              if (id.includes('stories')) {
                return 'stories';
              }
            }
          }
        },
      },
      esbuild: {
        logLevel: 'info',
        format: 'esm',
        target: 'esnext',
        tsconfigRaw: {
          compilerOptions: {
            experimentalDecorators: true,
          },
        },
      },
    });
  },
};

export default config; 