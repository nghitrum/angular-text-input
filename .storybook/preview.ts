import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
setCompodocJson(docJson);

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Global theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (storyFn, context) => {
      const theme = context.globals['theme'] ?? 'light';
      document.body.setAttribute('data-theme', theme);
      return storyFn();
    },
  ],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      source: {
        type: 'dynamic',
      },
      
    },
  },
};

// Add this to handle the word wrap globally
document.head.insertAdjacentHTML(
  'beforeend',
  `<style>
    .prismjs-code {
      white-space: pre-wrap !important;
      word-break: break-word !important;
    }
  </style>`,
);

export default preview;
