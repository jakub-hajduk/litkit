import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  Action,
  Aria,
  CSSState,
  CustomEventEmitter,
  ensureInternals,
  Role,
  SlottedText,
} from 'litkit';
import { Focusable } from '../../mixins/focusable/focusable.mixin';
import styles from './button.styles';

@Role('button')
@customElement('tru-button')
export class ButtonComponent extends Focusable(LitElement) {
  static formAssociated = true;
  static styles = [styles];

  @CSSState('default', (v: string) => v === 'default')
  @CSSState('primary', (v: string) => v === 'primary')
  @CSSState('critical', (v: string) => v === 'critical')
  @CSSState('ghost', (v: string) => v === 'ghost')
  @property({ type: String, reflect: true })
  variant?: 'default' | 'primary' | 'critical' | 'ghost' = 'default';

  actionEvent = new CustomEventEmitter<undefined>(this, 'action');

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

  @property({ type: Boolean, reflect: true })
  submit?: boolean;

  @Action()
  public click() {
    if (this.disabled) return;

    const prevented = !this.actionEvent.emit();

    if (prevented) return;

    if (this.submit) {
      const internals = ensureInternals(this);
      internals.form?.requestSubmit();
    }
  }

  render() {
    return html`<div id="container"><slot></slot></div>`;
  }
}
