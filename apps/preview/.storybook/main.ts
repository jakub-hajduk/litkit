import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: [
    "../../../packages/components/src/**/*.stories.ts",
    "../../../packages/litkit/src/**/*.stories.ts"
  ],
  addons: [],
  framework: {
    name: "@storybook/web-components-vite",
  }
};
export default config;
