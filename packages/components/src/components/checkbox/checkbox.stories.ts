import type { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import './checkbox.component';

const meta: Meta = {
  title: 'Components/Checkbox',
  component: 'tru-checkbox',
};

export default meta;

export const Default = () =>
  html`<tru-checkbox> I've read and agree to <a href="#">Terms and conditions</a>.</tru-checkbox>`;


export const NestedInLabel = () =>
  html`<label><span><tru-checkbox></tru-checkbox></span><span><strong>Click to check</strong></span></label>`;
