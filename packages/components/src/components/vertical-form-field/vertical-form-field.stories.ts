import type { Meta } from "@storybook/web-components-vite";
import { html } from "lit";
import './vertical-form-field.component';
import '../select/select.component';
import '../option/option.component';
import '../feedback-message/feedback-message.component'

const meta: Meta = {
  title: 'Components/Form Field/Vertical',
  component: 'my-vertical-form-field'
}

export default meta;

export const FormField = () => {
  return html`
    <my-vertical-form-field>
      <label slot="label">Label for the field</label>
      <input id="name" type="text" />
      <span slot="hint">Hint for the field</span>
    </my-vertical-form-field>
    <br/>
    <br/>
    <my-vertical-form-field>
      <label slot="label">Label for the field</label>
      <span slot="hint">Hint for the field</span>
      <my-select name="options">
          <my-option value="option1">Option 1</my-option>
          <my-option value="option2">Option 2</my-option>
      </my-select>
      <my-feedback-message variant="error" slot="feedback">
          Meh,something went wrong!
      </my-feedback-message>
    </my-vertical-form-field>
  `;
}
