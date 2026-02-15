import type { StorybookConfig } from '@storybook/angular';
import type { Configuration, RuleSetRule } from 'webpack';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs', '@storybook/addon-styling-webpack'],
  framework: {
    name: '@storybook/angular',
    options: {
      enableIvy: true,
    },
  },
  webpackFinal: async (config: Configuration) => {
    const rules = config.module?.rules as RuleSetRule[];

    // Remove any existing scss rules to avoid conflicts
    config.module!.rules = rules.filter((rule) => {
      if (rule?.test instanceof RegExp) {
        return !rule.test.test('.scss');
      }
      return true;
    });
    config.module!.rules.push({
      test: /\.scss$/,
      exclude: /src[\/\\]index\.scss$/,
      use: [
        'to-string-loader',
        'css-loader',
        { loader: 'resolve-url-loader', options: { sourceMap: true } },
        { loader: 'sass-loader', options: { sourceMap: true } },
      ],
    });

    // Global stylesheet — injected into DOM
    config.module!.rules.push({
      test: /src[\/\\]index\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        { loader: 'resolve-url-loader', options: { sourceMap: true } },
        { loader: 'sass-loader', options: { sourceMap: true } },
      ],
    });

    return config;
  },
};

export default config;
