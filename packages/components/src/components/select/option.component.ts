import { customElement, property } from "lit/decorators.js";
import { Role, CustomEventEmitter, State, Aria } from 'litkit';
import { css, html, LitElement} from "lit";
import { Action } from "litkit";
import { SlottedText } from "litkit";

const styles = css`
  :host {
      padding: 8px 12px;
      border-radius: 4px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
  }

  :host(:state(selected)) {
      background-color: #f0f0f0;
      color: #333;
  }

  :host(:state(disabled)) {
      opacity: 0.5;
      cursor: not-allowed;
  }
`

@Role('option')
@customElement('my-option')
export class MyOption extends LitElement {
  static styles = [styles]
  selectedEvent = new CustomEventEmitter<string>(this, 'selected', {bubbles: true, composed: true})

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
  select() {
    if (this.disabled) return;
    this.selected = true;
    this.selectedEvent.emit(this.value);
  }

  render() {
    return html`<slot></slot>`;
  }
}
