import type { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import './checkbox.component';

const meta: Meta = {
  title: 'Components/Checkbox',
  component: 'lk-checkbox',
};

export default meta;

export const Default = () =>
  html`<lk-checkbox> I've read and agree to <a href="#">Terms and conditions</a>.</lk-checkbox>`;

export const NestedInLabel = () =>
  html`<label><span><lk-checkbox></lk-checkbox></span><span><strong>Click to check</strong></span></label>`;
