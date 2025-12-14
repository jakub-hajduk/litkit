import type { Meta } from '@storybook/web-components-vite'
import { css, html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import { Action, Role } from 'litkit'
import { Focusable } from '../focusable/focusable.mixin'
import { Selectable } from './selectable.mixin'

const meta: Meta = {
  title: 'Selectable',
}

export default meta

const base = css`
    :host {
        border: 1px solid var(--neutral400);
        color: var(--neutral1200);
        border-radius: 8px;
        padding: 8px 12px;
        display: block;
        cursor: pointer;
    }
    `

@Role('button')
@customElement('test-selectable')
class SelectableCE extends Selectable(Focusable(LitElement)) {
  static styles = [base, css`
      :host(:state(selected)) {
          background: var(--neutral200);
      }`]

  @Action()
  click(): void {
    this.select()
  }

  render() {
    // ☐ ☑ ☒
    return html`${this.selected ? '\u2611' : '\u2610'}&nbsp;<slot></slot>`
  }
}

export const SelectableItem = {
  render: () => {
    return html`<div @selected="${console.log}">
        <test-selectable value="option-1">Option 1</test-selectable>
        <test-selectable value="option-2">Option 2</test-selectable>
        <test-selectable value="option-3">Option 3</test-selectable>
        <test-selectable value="option-4">Option 4</test-selectable>
        <test-selectable value="option-5">Option 5</test-selectable>
    </div>`
  }
}
