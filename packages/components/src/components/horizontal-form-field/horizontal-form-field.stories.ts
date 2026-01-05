import type { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import './horizontal-form-field.component';
import '../select/select.component';
import '../option/option.component';
import '../feedback-message/feedback-message.component';

const meta: Meta = {
  title: 'Components/Form Field/Horizontal',
  component: 'tru-horizontal-form-field',
};

export default meta;

export const FormField = () => {
  return html`
    <tru-horizontal-form-field>
      <label slot="label">Label for the field</label>
      <input id="name" type="text" />
      <span slot="hint">Hint for the field</span>
    </tru-horizontal-form-field>
    <br/>
    <br/>
    <tru-horizontal-form-field>
      <label slot="label">Label for the field</label>
      <span slot="hint">Hint for the field</span>
      <tru-select name="options">
          <tru-option value="option1">Option 1</tru-option>
          <tru-option value="option2">Option 2</tru-option>
      </tru-select>
      <tru-feedback-message variant="critical" slot="feedback">
          Meh,something went wrong!
      </tru-feedback-message>
    </tru-horizontal-form-field>
  `;
};
