import { css } from 'lit';

export default css`
  :host {
      padding: calc(var(--lk-space-medium-700) / var(--lk-aspect-ratio)) var(--lk-space-medium-700);
      border-radius: var(--lk-radius-rectangle-300);
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      transition-duration: 100ms;
      transition-timing-function: ease-in-out;
      transition-property: background-color, color;
      background-color: var(--lk-color-canvas-100);
      color: var(--lk-color-neutral-1000);
  }

  :host(:hover) {
      background-color: var(--lk-color-neutral-100);
  }

  :host(:state(selected)) {
      background-color: var(--lk-color-neutral-200);
      color: var(--lk-color-neutral-1200);
  }

  :host(:state(disabled)) {
      opacity: 0.5;
      cursor: not-allowed;
  }
`;
