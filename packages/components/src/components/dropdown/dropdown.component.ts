import { html, LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './dropdown.styles';

@customElement('tru-dropdown')
export class DropdownComponent extends LitElement {
  static styles = [styles];

  override popover = 'auto';

  toggle(toggle?: boolean): void {
    this.togglePopover(toggle);
  }

  show(): void {
    this.showPopover();
  }

  hide(): void {
    this.hidePopover();
  }

  render(): TemplateResult {
    return html`<slot></slot>`;
  }
}
