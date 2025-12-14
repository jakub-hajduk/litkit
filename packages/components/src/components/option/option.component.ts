import { customElement, property, state } from "lit/decorators.js";
import { Action, SlottedText, Role, CustomEventEmitter, State, Aria } from 'litkit';
import { css, html, LitElement, type CSSResult, type TemplateResult } from "lit";

const styles = css`
  :host {
      padding: 8px 12px;
      border-radius: 4px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      transition: background-color 200ms ease-in-out, color 200ms ease-in-out;
  }

  :host(:hover) {
      background-color: var(--neutral100);
  }

  :host(:state(selected)) {
      background-color: var(--neutral200);
      color: var(--neutral1000);
  }

  :host(:state(disabled)) {
      opacity: 0.5;
      cursor: not-allowed;
  }
`

@Role('option')
@customElement('my-option')
export class MyOption extends LitElement {
  static styles: CSSResult[] = [styles]
  selectedEvent: CustomEventEmitter<string> = new CustomEventEmitter<string>(this, 'selected', {bubbles: true, composed: true})

  @Aria('ariaDisabled')
  @State('disabled')
  @property({ type: Boolean, reflect: true })
  disabled: boolean = false

  @Aria('ariaSelected')
  @State('selected')
  @property({ type: Boolean, reflect: true })
  selected: boolean = false

  @property({ type: String, reflect: true })
  value?: string

  @Aria('ariaLabel')
  @SlottedText()
  label: string = ''

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
