import type { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import './text-input.component';

const meta: Meta = {
  title: 'Components/Text Input',
  component: 'tru-text-input',
};

export default meta;

export const Default = () => html`<tru-text-input></tru-text-input>`;

export const ImplicitLabel = () => html`<label>Label associated implicitly<br><br><tru-text-input></tru-text-input></label>`

export const ExplicitLabel = () => html`<label for="the-input">Label associated explicitly</label><br><br><tru-text-input id="the-input"></tru-text-input>`
