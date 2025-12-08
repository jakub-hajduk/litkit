import { css, html, LitElement, PropertyPart } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('my-dropdown')
export class MyDropdown extends LitElement {
  static override styles = css`
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

  toggle(toggle?: boolean) {
    this.togglePopover(toggle);
  }

  show() {
    this.showPopover();
  }

  hide() {
    this.hidePopover();
  }

  override render() {
    return html`<slot></slot>`;
  }
}
