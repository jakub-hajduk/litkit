import type { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import './tel-input.component';

const meta: Meta = {
  title: 'Components/Inputs/Tel',
  component: 'tru-tel-input',
};

export default meta;

export const Default = () => html`<tru-tel-input></tru-tel-input>`;

export const ImplicitLabel = () => html`<label>Label associated implicitly<br><br><tru-tel-input></tru-tel-input></label>`

export const ExplicitLabel = () => html`<label for="the-input">Label associated explicitly</label><br><br><tru-tel-input id="the-input"></tru-tel-input>`
