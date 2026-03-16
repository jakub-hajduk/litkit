import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('lk-stack')
export class StackComponent extends LitElement {
  static styles = [
    css`
      slot {
          display: flex;
          flex-direction: column;
          gap: var(--lk-space-medium-700);
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}
