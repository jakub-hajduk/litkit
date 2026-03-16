import { css } from 'lit';

export default css`
    :host {
      font: var(--lk-typography-body-600);
      display: flex;
      gap: var(--lk-space-medium-500);
      align-items: center;
    }

    svg {
        display: block;
        width: var(--lk-size-regular-700);
        height: var(--lk-size-regular-700);
        aspect-ratio: 1;
    }

    :host(:state(critical)) {
      color: var(--lk-color-critical-800);
    }

    :host(:state(caution)) {
      color: var(--lk-color-caution-800);
    }

    :host(:state(positive)) {
      color: var(--lk-color-positive-800);
    }

    :host(:state(info)) {
      color: var(--lk-color-info-800);
    }

    :host(:state(default)) {}
      color: var(--lk-color-neutral-800);
    }
  `;
