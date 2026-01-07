import { css, unsafeCSS } from 'lit';

export function formFieldStyles(
  wrapperSelector = '#container',
  fieldSelector = 'input',
) {
  return css`
      ${unsafeCSS(wrapperSelector)} {
          align-items: center;
          padding: calc(var(--tru-space-medium-700) / var(--tru-aspect-ratio)) var(--tru-space-medium-700);
          border-radius: var(--tru-radius-rectangle-300);
          width: 100%;
          border: 1px solid var(--tru-color-neutral-400);
          color: var(--tru-color-neutral-1000);
          background-color: var(--tru-color-canvas-100);
          box-sizing: border-box;
          cursor: pointer;
      }

      :host(:focus),
      ${unsafeCSS(fieldSelector)}:focus {
          outline: none
      }
      
      :host(:state(disabled)) > ${unsafeCSS(wrapperSelector)} {
          
      }
      
      :host(:state(error)) > ${unsafeCSS(wrapperSelector)} {
          
      }

      :host(:state(readonly)) > ${unsafeCSS(wrapperSelector)} {

      }

      :host(:state(required)) > ${unsafeCSS(wrapperSelector)} {

      }

      ${unsafeCSS(fieldSelector)} {
          border: none;
          padding: 0;
          margin: 0;
          width: 100%;
          font: var(--tru-typography-body-700);
      }
  `;
}
