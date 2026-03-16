import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Action, Aria, CSSState, Role, SlottedText } from 'litkit';
import { Selectable } from 'litkit-primitives';
import styles from './radio.styles';

@Role('radio')
@customElement('tru-radio')
export class RadioComponent extends Selectable(LitElement) {
  static styles = [styles];

  @SlottedText()
  @Aria('ariaLabel')
  @property({ type: String, attribute: true })
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
    return html`<div id="container" inert>
        <div id="tick"></div>
        <slot></slot></div>`;
  }
}
