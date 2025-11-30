import type { Meta } from '@storybook/web-components-vite'
import { css, html } from 'lit'
import { customElement, query } from 'lit/decorators.js'
import { Aria } from 'litkit'
import { TextFieldComponent } from './text-field.component'

const meta: Meta = {
  title: 'Text field',
}

export default meta

const styles = css`
    :host {
        border: 1px solid green;
        border-radius: 8px;
        border-radius: 10px;
        corner-shape: squircle;
        display: block;
        height: auto;
    }
    input {
        all: unset;
        padding: 8px 12px;
    }
    `

@customElement('test-text-field')
class TextField extends TextFieldComponent {
  static styles = [styles]

  @query('input')
  _delegatedElement: HTMLInputElement;

  render() {
    return html`<input id="control" type="text" />`
  }
}

export const Default = {
  render: (props) => {
    return html`<test-text-field required></test-text-field>`
  }
}
