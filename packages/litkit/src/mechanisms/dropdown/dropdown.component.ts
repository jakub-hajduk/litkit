import {
  type CSSResult,
  css,
  html,
  LitElement,
  type TemplateResult,
} from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('my-dropdown')
export class Dropdown extends LitElement {
  static override styles: CSSResult = css`
  :host {
    unset: all;
    position: absolute;
    inset: auto;
    top: anchor(bottom);
    right: anchor(right);
    box-sizing: border-box;
    width: anchor-size(width);

    opacity: 0;
    translate: 0 -10px;

    transition: display ease-out, opacity ease-out, translate ease-out;
    transition-duration: 2s;
    transition-behavior: allow-discrete;
  }

  :host(:popover-open) {
    display: block;
    opacity: 1;
    translate: 0 0;

    @starting-style {
      opacity: 0;
      translate: 0 -10px; 
    }
  }
  `;

  override popover = 'auto';

  toggle: (toggle?: boolean) => boolean = this.togglePopover;

  show: () => void = this.showPopover;

  hide: () => void = this.hidePopover;

  override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}
