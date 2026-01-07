import { css, unsafeCSS } from 'lit';

export function focusStyles(wrapperSelector = '#container') {
  return css`
      ${unsafeCSS(wrapperSelector)} {
          transition: outline-color 100ms ease-in-out;
          outline-color: transparent;
      }

      :host(:focus-within) ${unsafeCSS(wrapperSelector)},
      :host(:focus-visible) ${unsafeCSS(wrapperSelector)} {
          outline: 3px solid var(--tru-color-primary-500);
          outline-offset: 3px;
      }`;
}
