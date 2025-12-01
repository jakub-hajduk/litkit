import type { Meta } from '@storybook/web-components-vite'
import { css, html, LitElement } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { Role } from 'litkit'
import { CustomFormField } from '../../mixins/form/custom-form-field.mixin'
import { DelegatedFormField } from '../../mixins/form/delegated-form-field.mixin'
import { Base } from '../base/base.mixin'

const meta: Meta = {
  title: 'Form field',
}

export default meta

const base = css`
    :host {
        border: 1px solid #ccc;
        border-radius: 8px;
        display: block;
    }
    `

@Role('textbox')
@customElement('test-delegated-field')
class DelegatedFieldCE extends DelegatedFormField(Base(LitElement)) {
  static styles = [base, css`
      input {
          padding: 8px 12px;
          box-sizing: border-box;
          width: 100%;
      }`]

  @property({ type: String, reflect: true })
  value: string  = ''

  @query('input')
  _delegatedElement!: HTMLElement;

  render() {
    return html`<input id="control" type="text" />`
  }
}

export const DelegatedField = {
  render: () => {
    return html`<test-delegated-field @input="${console.log}" label="Podaj pierwsze imię" description="To pole jest do imienia."></test-delegated-field>`
  }
}



@Role('radiogroup')
@customElement('test-custom-field')
class CustomFieldCE extends CustomFormField(Base(LitElement)) {
  static styles = [
    base,
    css`
        :host {
            padding: 12px 12px;
            display: flex;
            gap: 12px;
        }
        button {
            padding: 8px 12px;
            cursor: pointer;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
    `]

  @property({ type: String, reflect: true })
  value: string  = ''

  render() {
    return html`
        <button @click="${() => this.value = 'Value one'}">Value one</button>
        <button @click="${() => this.value = 'Value two'}">Value two</button>`
  }
}

export const CustomField = {
  render: () => {
    return html`<test-custom-field @input="${console.log}" label="Podaj pierwsze imię" description="To pole jest do imienia."></test-custom-field>`
  }
}
