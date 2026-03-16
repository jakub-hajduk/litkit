import { css, unsafeCSS } from 'lit';

export function buttonStyles(wrapperSelector = '#container') {
  return css`
      :host ${unsafeCSS(wrapperSelector)} {
          display: inline-block;
          font: var(--lk-typography-caption-700);
          padding: calc(var(--lk-space-medium-700) / var(--lk-aspect-ratio)) var(--lk-space-medium-700);
          cursor: pointer;
          border-width: 1px;
          border-style: solid;
          border-radius: var(--lk-radius-rectangle-300);
          transition-duration: 100ms;
          transition-timing-function: ease-in-out;
          transition-property: border-color, color, transform, background-color, outline-color;
          outline-color: transparent;
          user-select: none;
      }

      :host(:focus) {
          outline: none;
      }

      :host(:focus-visible) ${unsafeCSS(wrapperSelector)} {
          outline: 3px solid var(--lk-color-primary-500);
          outline-offset: 3px;
      }

      :host(:active:not(:state(disabled))) ${unsafeCSS(wrapperSelector)} { 
          transform: translateY(2px);
      }

      :host(:state(disabled)) ${unsafeCSS(wrapperSelector)} {
          cursor: default;
      }

      :host ${unsafeCSS(wrapperSelector)} {
          border-color: var(--lk-color-neutral-500);
          background-color: var(--lk-color-neutral-100);
          color: var(--lk-color-neutral-1200);
      }

      :host(:hover) ${unsafeCSS(wrapperSelector)} {
          border-color: var(--lk-color-neutral-600);
          background-color: var(--lk-color-neutral-200);
          color: var(--lk-color-neutral-1200);
      }

      :host(:active) ${unsafeCSS(wrapperSelector)} {
          border-color: var(--lk-color-neutral-700);
          background-color: var(--lk-color-neutral-300);
          color: var(--lk-color-neutral-1300);
      }

      :host(:state(disabled)) ${unsafeCSS(wrapperSelector)} {
          border-color: var(--lk-color-neutral-400);
          background-color: var(--lk-color-neutral-100);
          color: var(--lk-color-neutral-500);
      }`;
}
