import type { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import './date-input.component';

const meta: Meta = {
  title: 'Components/Inputs/Date',
  component: 'lk-date-input',
};

export default meta;

export const Default = () => html`<lk-date-input></lk-date-input>`;

export const ImplicitLabel = () =>
  html`<label>Label associated implicitly<br><br><lk-date-input></lk-date-input></label>`;

export const ExplicitLabel = () =>
  html`<label for="the-input">Label associated explicitly</label><br><br><lk-date-input id="the-input"></lk-date-input>`;
