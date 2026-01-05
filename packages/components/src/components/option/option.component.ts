import { type CSSResult, html, LitElement, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  Action,
  Aria,
  CSSState,
  CustomEventEmitter,
  Role,
  SlottedText,
} from 'litkit';
import styles from './option.styles';

@Role('option')
@customElement('tru-option')
export class OptionComponent extends LitElement {
  static styles: CSSResult[] = [styles];
  selectedEvent: CustomEventEmitter<string> = new CustomEventEmitter<string>(
    this,
    'selected',
    { bubbles: true, composed: true },
  );

  @Aria('ariaDisabled')
  @CSSState('disabled')
  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  @Aria('ariaSelected')
  @CSSState('selected')
  @property({ type: Boolean, reflect: true })
  selected: boolean = false;

  @property({ type: String, reflect: true })
  value?: string;

  @Aria('ariaLabel')
  @SlottedText()
  label: string = '';

  @Action()
  select(): void {
    if (this.disabled) return;
    this.selected = true;
    this.selectedEvent.emit(this.value);
  }

  render(): TemplateResult {
    return html`<slot></slot>`;
  }
}
