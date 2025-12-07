import { Meta } from "@storybook/web-components-vite";
import { css, html, LitElement } from "lit";

import './select.component';
import './option.component';
import { customElement } from "lit/decorators.js";
import { Focusable } from "../../mixins/focusable/focusable.mixin";

const meta: Meta = {
  title: 'Components/Select',
  component: 'my-select',
};

export default meta;

export const Option = () => html`
  <my-option value="1">Option 1</my-option>
`;


const checkForm = (event: Event) => {
  const form = event?.currentTarget as HTMLFormElement
  if (!form) return;
  const formData = new FormData(form);

  console.log( Object.fromEntries(formData.entries()) )
}

@customElement('test-te')
class Elo extends Focusable(LitElement) {
  static styles = [
    css`
      :host {
          display: block;
          padding: 8px 12px
      }
      :host(:focus) {

          background-color: red;
      }
    `,
  ];

  render() {
    return html`
      <div>Hello World</div>
    `;
  }
}

export const Select = () => html`
<form @change=${checkForm} style="height: 400px;">
    <test-te></test-te>
  <my-select name="color">
    <my-option value="red">Red</my-option>
    <my-option value="green">Green</my-option>
    <my-option value="blue">Blue</my-option>
    <my-option value="disabled" disabled>Disabled</my-option>
  </my-select>
</form>
`;
