import type { Meta } from '@storybook/web-components-vite';
import './button.component'
import { html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { Focusable } from '../../mixins/focusable/focusable.mixin'
import { ButtonComponent } from './button.component'

const meta: Meta = {
  title: 'Button',
  component: 'my-button',
}

export default meta

class Button extends Focusable(ButtonComponent) {
  render() {
    return html`<h1>Elo</h1>`
  }
}

customElements.define('own-button', Button)

export const Default = {
  render: (props) => {
    return html`<own-button @action="${console.log}"></own-button>`
  }
}
