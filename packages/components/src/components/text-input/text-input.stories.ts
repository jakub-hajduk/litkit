import type { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import './text-input.component';

const meta: Meta = {
  title: 'Components/Inputs/Text',
  component: 'lk-text-input',
};

export default meta;

export const Default = () => html`<lk-text-input></lk-text-input>`;

export const ImplicitLabel = () =>
  html`<label>Label associated implicitly<br><br><lk-text-input></lk-text-input></label>`;

export const ExplicitLabel = () =>
  html`<label for="the-input">Label associated explicitly</label><br><br><lk-text-input id="the-input"></lk-text-input>`;
