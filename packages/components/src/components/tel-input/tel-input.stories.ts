import type { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import './tel-input.component';

const meta: Meta = {
  title: 'Components/Inputs/Tel',
  component: 'lk-tel-input',
};

export default meta;

export const Default = () => html`<lk-tel-input></lk-tel-input>`;

export const ImplicitLabel = () =>
  html`<label>Label associated implicitly<br><br><lk-tel-input></lk-tel-input></label>`;

export const ExplicitLabel = () =>
  html`<label for="the-input">Label associated explicitly</label><br><br><lk-tel-input id="the-input"></lk-tel-input>`;
