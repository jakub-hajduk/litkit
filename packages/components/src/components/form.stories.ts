import type { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import './stack/stack.component';
import './vertical-form-field/vertical-form-field.component';
import './text-input/text-input.component';
import './select/select.component';
import './option/option.component';
import './checkbox/checkbox.component';
import './toggle-button-group/toggle-button-group.component';
import './toggle-button/toggle-button.component';

const meta: Meta = {
  title: 'Form',
};

export default meta;

export const Form = () => {
  const checkForm = (event: Event) => {
    const form = event?.currentTarget as HTMLFormElement;
    if (!form) return;
    const formData = new FormData(form);

    console.log(Object.fromEntries(formData as any));
  };

  return html`<form @change=${checkForm}>
      <tru-stack>
        <tru-vertical-field>
            <label slot="label">Name</label>
            <tru-text-input name="name"></tru-text-input>
        </tru-vertical-field>
        <tru-vertical-field>
            <label slot="label">Language</label>
            <span slot="hint">Please select your preferred programming language</span>
            <tru-select name="lang">
                <tru-option value="dot-net">.NET</tru-option>
                <tru-option value="go">Go</tru-option>
                <tru-option value="java">Java</tru-option>
                <tru-option value="php">PHP</tru-option>
                <tru-option value="rust">Rust</tru-option>
                <tru-option value="typescript">TypeScript</tru-option>
                <tru-option value="javascript">JavaScript</tru-option>
            </tru-select>
        </tru-vertical-field>
        <tru-checkbox name="agreement">I am ready to use this framework.</tru-checkbox>
        <tru-checkbox name="ka" label="This checkbox is labelled differently.">I am over 18 years old.</tru-checkbox>
        <tru-vertical-field>
            <label slot="label">
                Preferred color
            </label>
            <tru-toggle-button-group name="preferred-color" value="orange">
                <tru-toggle-button value="blue">Blue</tru-toggle-button>
                <tru-toggle-button value="yellow">Yellow</tru-toggle-button>
                <tru-toggle-button value="orange">Orange</tru-toggle-button>
                <tru-toggle-button value="pink">Pink</tru-toggle-button>
                <tru-toggle-button value="black">Black</tru-toggle-button>
            </tru-toggle-button-group>
        </tru-vertical-field>
      </tru-stack>
  </form>`;
};
