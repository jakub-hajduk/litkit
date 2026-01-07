import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Action, Aria, CSSState, Role, SlottedText } from 'litkit';
import { Focusable } from '../../mixins/focusable/focusable.mixin';
import { Selectable } from '../../mixins/selectable/selectable.mixin';
import { buttonStyles } from '../../shared/styles/button.styles';
import { focusStyles } from '../../shared/styles/focus.styles';
import styles from './toggle-button.styles';

@Role('radio')
@customElement('tru-toggle-button')
export class ToggleButtonComponent extends Selectable(LitElement) {
  static styles = [buttonStyles(), styles];

  @SlottedText()
  @Aria('ariaLabel')
  @property({ type: String, state: true })
  label?: string;

  @Aria('ariaDescription')
  @property({ type: String, reflect: true })
  description?: string;

  @CSSState('disabled')
  @Aria('ariaDisabled')
  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  @property({ type: String, reflect: true })
  value?: string;

  @Action()
  public click() {
    if (this.disabled) return;
    this.selected = true;
    this.selectedEvent.emit(this.value);
  }

  render() {
    return html`<div id="container"><slot></slot></div>`;
  }
}
