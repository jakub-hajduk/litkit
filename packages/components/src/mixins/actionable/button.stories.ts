import type { Meta } from '@storybook/web-components-vite';
import { css, html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import { Role, Internals } from 'litkit'
import { Button } from '../../mixins/actionable/button.mixin'
import { Focusable } from '../../mixins/focusable/focusable.mixin'
import { Base } from '../base/base.mixin'

const meta: Meta = {
  title: 'Button',
  component: 'my-button',
}

export default meta


const base = css`
    :host {
        border: 1px solid #ccc;
        border-radius: 8px;
        display: inline-block;
        padding: 12px 12px;
        cursor: pointer;
    }
`

@Role('button')
@customElement('test-button')
class ButtonCE extends Focusable(Button(Base(LitElement))) {
  static styles=[base]

  render() {
    return html`<slot></slot>`
  }
}

const submit = (e: SubmitEvent) => {
  e.preventDefault()
  console.log( e )
  return false;
}

export const SubmitButton = {
  render: () => {
    return html`
        <form @submit=${submit}>
            <test-button submit>Submit</test-button>
        </form>`
  }
}

export const RegularButton = {
  render: () => {
    return html`<test-button label="Hello" value="Hello" @action="${console.log}">Regualr</test-button>`
  }
}
