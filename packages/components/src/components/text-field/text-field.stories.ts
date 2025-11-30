import type { Meta } from '@storybook/web-components-vite';
import { css, html } from 'lit'
import { query } from 'lit/decorators.js'
import { FormField } from '../../mixins/form/form.mixin'
import { TextFieldComponent } from './text-field.component'

const meta: Meta = {
  title: 'Text field',
}

export default meta

class TextField extends TextFieldComponent {
  static styles = [
    css`:host { background-color: red; } input { all: unset; background-color: green; color: white; }`
  ]

  @query('input')
  _delegatedElement: HTMLInputElement;

  render() {
    return html`<h1>Te</h1><input type="text" />`
  }
}

customElements.define('text-field', TextField)

export const Default = {
  render: (props) => {
    return html`<text-field></text-field>`
  }
}
