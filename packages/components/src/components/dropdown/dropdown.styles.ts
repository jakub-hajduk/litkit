import { css } from 'lit';

export default css`
  :host {
    position: absolute;
    inset: auto;
    top: anchor(bottom);
    right: anchor(right);
    box-sizing: border-box;
    width: anchor-size(width);

    opacity: 0;
    translate: 0 -10px;

    transition: opacity, translate, display;
    transition-duration: 100ms;
    transition-timing-function: ease-in-out;
    transition-behavior: allow-discrete;

    border: 1px solid var(--tru-color-neutral-300);
    background-color: var(--tru-color-canvas-100);
    border-radius: var(--tru-radius-rectangle-300);
    margin-top: var(--tru-space-medium-100);
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
