import type { Meta } from '@storybook/web-components-vite'
import { css, html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import { Action, Role } from 'litkit'
import { Base } from '../base/base.mixin'
import { Focusable } from '../focusable/focusable.mixin'
import { CustomFormField } from '../form/custom-form-field.mixin'
import { Selectable } from '../selectable/selectable.mixin'
import { WithSingleSelect } from './with-single-select.mixin'

const meta: Meta = {
  title: 'Selectable',
}

export default meta

@Role('radio')
@customElement('test-option')
class OptionCE extends Selectable(Focusable(Base(LitElement))) {
  static styles = [css`
      :host {
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 8px 12px;
          display: block;
          cursor: pointer;
      }
      :host(:state(selected)) {
          background: #f5f5f5;
      }`]

  @Action()
  click() {
    this.select()
  }

  render() {
    // ☐ ☑ ☒
    return html`${this.selected ? '\u2611' : '\u2610'}&nbsp;<slot></slot>`
  }
}

@Role('radiogroup')
@customElement('test-single-select')
class SingleSelectCE extends CustomFormField(WithSingleSelect(Base(LitElement))) {
  static styles = [css`
      :host {
        border: 1px solid #ccc;
        border-radius: 14px;
        padding: 8px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
  `]

  render() {
    return html`<slot></slot>`
  }
}

export const SingleSelect = {
  render: () => {
    return html`<test-single-select @change="${(e) => console.log(e.target.value)}"">
        <test-option value="option-1">Option 1</test-option>
        <test-option value="option-2">Option 2</test-option>
        <test-option value="option-3">Option 3</test-option>
        <test-option value="option-4">Option 4</test-option>
        <test-option value="option-5">Option 5</test-option>
    </test-single-select>`
  }
}
