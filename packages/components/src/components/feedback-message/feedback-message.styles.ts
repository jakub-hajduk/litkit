import { css } from 'lit';

export default css`
    :host {
      font: var(--tru-typography-body-600);
      display: flex;
      gap: var(--tru-space-medium-500);
      align-items: center;
    }

    svg {
        display: block;
        width: var(--tru-size-regular-700);
        height: var(--tru-size-regular-700);
        aspect-ratio: 1;
    }

    :host(:state(critical)) {
      color: var(--tru-color-critical-800);
    }

    :host(:state(caution)) {
      color: var(--tru-color-caution-800);
    }

    :host(:state(positive)) {
      color: var(--tru-color-positive-800);
    }

    :host(:state(info)) {
      color: var(--tru-color-info-800);
    }

    :host(:state(default)) {}
      color: var(--tru-color-neutral-800);
    }
  `;
