import type { Meta } from '@storybook/web-components-vite';
import { html } from 'lit'
import { Focusable } from '../../mixins/focusable/focusable.mixin'
import { SubmitButtonComponent } from './submit-button.component'

const meta: Meta = {
  title: 'Submit Button',
}

export default meta

class SubmitButton extends Focusable(SubmitButtonComponent) {
  render() {
    return html`<h1>Submit</h1>`
  }
}

customElements.define('own-submit-button', SubmitButton)

export const Default = {
  render: (props) => {
    return html`<form method="post" action="add.php">
        <own-submit-button @action="${console.log}"></own-submit-button>
    </form>`
  }
}
