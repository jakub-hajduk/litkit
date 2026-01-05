import type { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import './select.component';
import '../option/option.component';

const meta: Meta = {
  title: 'Components/Select',
  component: 'my-select',
};

export default meta;

export const Option = () => html`
  <tru-option value="1">Option 1</tru-option>
`;

const checkForm = (event: Event) => {
  const form = event?.currentTarget as HTMLFormElement;
  if (!form) return;
  const formData = new FormData(form);

  console.log(Object.fromEntries(formData as any));
};

export const Select = () => html`
<form @change=${checkForm}>
  <tru-select name="color">
    <tru-option value="red">Red</tru-option>
    <tru-option value="green">Green</tru-option>
    <tru-option value="blue">Blue</tru-option>
    <tru-option value="orange">Orange</tru-option>
    <tru-option value="yellow">Yellow</tru-option>
    <tru-option value="pink">Pink</tru-option>
    <tru-option value="Brown">Brown</tru-option>
    <tru-option value="white" disabled>White</tru-option>
  </tru-select>
</form>
`;
