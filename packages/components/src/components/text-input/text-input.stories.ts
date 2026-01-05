import type { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import './text-input.component';

const meta: Meta = {
  title: 'Components/Text Input',
  component: 'tru-text-input',
};

export default meta;

export const Default = () => html`<tru-text-input></tru-text-input>`;
