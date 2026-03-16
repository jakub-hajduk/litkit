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
import './radio-group/radio-group.component';
import './radio/radio.component';

const meta: Meta = {
  title: 'Components/Form',
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
      <lk-stack>
        <lk-vertical-field>
            <label slot="label">Name</label>
            <lk-text-input name="name" value="Marvin"></lk-text-input>
        </lk-vertical-field>
        <lk-vertical-field>
            <label slot="label">Language</label>
            <span slot="hint">Please select your preferred programming language</span>
            <lk-select name="lang" value="typescript">
                <lk-option value="dot-net">.NET</lk-option>
                <lk-option value="go">Go</lk-option>
                <lk-option value="java">Java</lk-option>
                <lk-option value="php">PHP</lk-option>
                <lk-option value="rust">Rust</lk-option>
                <lk-option value="typescript">TypeScript</lk-option>
                <lk-option value="javascript">JavaScript</lk-option>
            </lk-select>
        </lk-vertical-field>
        <lk-checkbox name="agreement" checked>I am ready to use this framework.</lk-checkbox>
        <lk-checkbox name="ka" label="This checkbox is labelled differently.">I am over 18 years old.</lk-checkbox>
        <lk-vertical-field>
            <label slot="label">
                Preferred color
            </label>
            <lk-toggle-button-group name="preferred-color" value="orange">
                <lk-toggle-button value="blue">Blue</lk-toggle-button>
                <lk-toggle-button value="yellow">Yellow</lk-toggle-button>
                <lk-toggle-button value="orange">Orange</lk-toggle-button>
                <lk-toggle-button value="pink">Pink</lk-toggle-button>
                <lk-toggle-button value="black">Black</lk-toggle-button>
            </lk-toggle-button-group>
        </lk-vertical-field>
        <lk-vertical-field>
            <label slot="label">
                Size
            </label>
            <lk-radio-group name="size">
                <lk-radio value="xs">Extra small</lk-radio>
                <lk-radio value="s">Small</lk-radio>
                <lk-radio value="m" label="Label is set by an attribute" description="This option has additional description set by description attribute">Medium</lk-radio>
                <lk-radio value="l" selected>Large</lk-radio>
                <lk-radio value="xl">Extra large</lk-radio>
            </lk-radio-group>
        </lk-vertical-field>
      </lk-stack>
  </form>`;
};
