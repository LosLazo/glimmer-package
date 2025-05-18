import type { Preview } from '@storybook/vue3';
import '../src/styles/global/global.css';
import '../src/styles/global/fonts.css';
import '../src/styles/global/grid.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview; 