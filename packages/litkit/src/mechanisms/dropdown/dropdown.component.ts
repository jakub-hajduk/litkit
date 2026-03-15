import {
  type CSSResult,
  css,
  html,
  LitElement,
  type TemplateResult,
} from 'lit';
import { customElement } from 'lit/decorators.js';
import { CustomEventEmitter } from '../custom-event-emitter';

/**
 * A popover-based dropdown component with cancellable open and close lifecycle events.
 * Use it to render anchored dropdown content and control visibility through `show`, `hide`, or `toggle`.
 *
 * @example
 * html`
 *   <button popovertarget="menu">Open menu</button>
 *   <my-dropdown id="menu" @dropdown-open=${(e: Event) => e.preventDefault()}>
 *     <div>Menu content</div>
 *   </my-dropdown>
 * `;
 */
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

  /**
   * Emits before the dropdown opens.
   * Prevent the event to cancel opening.
   */
  private openEvent = new CustomEventEmitter(this, 'dropdown-open', {
    cancelable: true,
  });
  /**
   * Emits before the dropdown closes.
   * Prevent the event to cancel closing.
   */
  private closeEvent = new CustomEventEmitter(this, 'dropdown-close', {
    cancelable: true,
  });
  /**
   * Emits after the dropdown is opened.
   */
  private openedEvent = new CustomEventEmitter(this, 'dropdown-opened');
  /**
   * Emits after the dropdown is closed.
   */
  private closedEvent = new CustomEventEmitter(this, 'dropdown-closed');

  override popover = 'auto';

  toggle: (toggle?: boolean) => boolean = this.togglePopover;

  show(): void {
    const shouldOpen = !this.openEvent.emit();
    if (shouldOpen) {
      this.showPopover();
      this.openedEvent.emit();
    }
  }

  hide(): void {
    const shouldClose = !this.closeEvent.emit();
    if (shouldClose) {
      this.hidePopover();
      this.closedEvent.emit();
    }
  }

  override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}
