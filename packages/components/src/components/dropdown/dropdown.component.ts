import { css, html, LitElement, type CSSResult, type TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('my-dropdown')
export class MyDropdown extends LitElement {
  static override styles: CSSResult = css`
  :host {
    position: absolute;
    inset: auto;
    top: anchor(bottom);
    right: anchor(right);
    box-sizing: border-box;
    width: anchor-size(width);

    opacity: 0;
    translate: 0 -10px;

    transition: opacity ease, translate ease, display ease;
    transition-duration: 100ms;
    transition-behavior: allow-discrete;

    border: 1px solid var(--neutral300);
    color: var(--neutral1200);
    border-radius: 8px;
    margin-top: 4px;
  }

  :host(:popover-open) {
    opacity: 1;
    translate: 0 0;

    @starting-style {
      opacity: 0;
      translate: 0 -10px;
    }
  }
  `;

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
