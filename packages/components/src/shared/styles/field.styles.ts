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
          transition: box-shadow 100ms ease-in-out;
      }

      :host(:focus) {
          outline: none;
      }
      
      :host(:focus-visible) ${unsafeCSS(wrapperSelector)} {
          outline: none;
          box-shadow:
                  0 0 0 3px var(--tru-color-canvas-100),
                  0 0 0 6px var(--tru-color-primary-500);
      }
  
      :host(:not(:focus-visible):focus) > ${unsafeCSS(wrapperSelector)} {
          box-shadow:
                  0 0 0 3px var(--tru-color-canvas-100),
                  0 0 0 6px var(--tru-color-primary-500);
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

      ${unsafeCSS(fieldSelector)}:focus {
          outline: none;
    }
  `;
}
