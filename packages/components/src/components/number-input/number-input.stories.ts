import type { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import './number-input.component';

const meta: Meta = {
  title: 'Components/Inputs/Number',
  component: 'lk-number-input',
};

export default meta;

export const Default = () => html`<lk-number-input></lk-number-input>`;

export const ImplicitLabel = () =>
  html`<label>Label associated implicitly<br><br><lk-number-input></lk-number-input></label>`;

export const ExplicitLabel = () =>
  html`<label for="the-input">Label associated explicitly</label><br><br><lk-number-input id="the-input"></lk-number-input>`;
