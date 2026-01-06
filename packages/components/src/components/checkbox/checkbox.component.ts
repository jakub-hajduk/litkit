import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { CSSState, Role } from 'litkit'
import { Aria } from 'litkit'
import { Focusable } from '../../mixins/focusable/focusable.mixin'
import { CheckableFormField } from '../../mixins/form/checkable-form-field.mixin'
import styles from './checkbox.styles'

@Role('checkbox')
@customElement('tru-checkbox')
export class CheckboxComponent extends CheckableFormField(Focusable(LitElement)) {
  static styles = [ styles ];

  @CSSState('checked')
  @Aria('ariaChecked')
  @property({ type: Boolean, reflect: true })
  checked: boolean = false;

  render() {
    return html`
    <div id="container" inert>
      <div id="tick"></div>
    </div>
    <slot></slot>`;
  }
}
