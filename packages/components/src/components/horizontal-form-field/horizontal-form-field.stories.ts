import type { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import './horizontal-form-field.component';
import '../select/select.component';
import '../option/option.component';
import '../feedback-message/feedback-message.component';

const meta: Meta = {
  title: 'Components/Form Field/Horizontal',
  component: 'lk-horizontal-field',
};

export default meta;

export const FormField = () => {
  return html`
    <lk-horizontal-field>
      <label slot="label">Label for the field</label>
      <input id="name" type="text" />
      <span slot="hint">Hint for the field</span>
    </lk-horizontal-field>
    <br/>
    <br/>
    <lk-horizontal-field>
      <label slot="label">Label for the field</label>
      <span slot="hint">Hint for the field</span>
      <lk-select name="options">
          <lk-option value="option1">Option 1</lk-option>
          <lk-option value="option2">Option 2</lk-option>
      </lk-select>
      <lk-feedback-message variant="critical" slot="feedback">
          Meh,something went wrong!
      </lk-feedback-message>
    </lk-horizontal-field>
  `;
};
