import type { Meta } from "@storybook/web-components-vite";
import { html } from "lit";
import './horizontal-form-field.component';
import '../select/select.component';
import '../option/option.component';
import '../feedback-message/feedback-message.component'

const meta: Meta = {
  title: 'Components/Form Field/Horizontal',
  component: 'my-horizontal-form-field'
}

export default meta;

export const FormField = () => {
  return html`
    <my-horizontal-form-field>
      <label slot="label">Label for the field</label>
      <input id="name" type="text" />
      <span slot="hint">Hint for the field</span>
    </my-horizontal-form-field>
    <br/>
    <br/>
    <my-horizontal-form-field>
      <label slot="label">Label for the field</label>
      <span slot="hint">Hint for the field</span>
      <my-select name="options">
          <my-option value="option1">Option 1</my-option>
          <my-option value="option2">Option 2</my-option>
      </my-select>
      <my-feedback-message variant="error" slot="feedback">
          Meh,something went wrong!
      </my-feedback-message>
    </my-horizontal-form-field>
  `;
}
