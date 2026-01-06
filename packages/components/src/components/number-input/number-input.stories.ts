import type { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import './number-input.component';

const meta: Meta = {
  title: 'Components/Number Input',
  component: 'tru-text-input',
};

export default meta;

export const Default = () => html`<tru-number-input></tru-number-input>`;

export const ImplicitLabel = () => html`<label>Label associated implicitly<br><br><tru-number-input></tru-number-input></label>`

export const ExplicitLabel = () => html`<label for="the-input">Label associated explicitly</label><br><br><tru-number-input id="the-input"></tru-number-input>`
