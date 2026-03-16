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
  <lk-option value="1">Option 1</lk-option>
`;

const checkForm = (event: Event) => {
  const form = event?.currentTarget as HTMLFormElement;
  if (!form) return;
  const formData = new FormData(form);

  console.log(Object.fromEntries(formData as any));
};

export const Select = () => html`
<form @change=${checkForm}>
  <lk-select name="color">
    <lk-option value="red">Red</lk-option>
    <lk-option value="green">Green</lk-option>
    <lk-option value="blue">Blue</lk-option>
    <lk-option value="orange">Orange</lk-option>
    <lk-option value="yellow">Yellow</lk-option>
    <lk-option value="pink">Pink</lk-option>
    <lk-option value="Brown">Brown</lk-option>
    <lk-option value="white" disabled>White</lk-option>
  </lk-select>
</form>
`;
