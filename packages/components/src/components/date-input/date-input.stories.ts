import type { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import './date-input.component';

const meta: Meta = {
  title: 'Components/Inputs/Date',
  component: 'tru-date-input',
};

export default meta;

export const Default = () => html`<tru-date-input></tru-date-input>`;

export const ImplicitLabel = () => html`<label>Label associated implicitly<br><br><tru-date-input></tru-date-input></label>`

export const ExplicitLabel = () => html`<label for="the-input">Label associated explicitly</label><br><br><tru-date-input id="the-input"></tru-date-input>`
