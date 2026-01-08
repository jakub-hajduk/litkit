import { css } from 'lit';

export default css`
    :host {
        cursor: pointer;
        display: inline-block
    }

    :host(:state(selected)) #tick {
        background-color: var(--tru-color-primary-800);
    }

    #container {
        display: inline-flex;
        gap: var(--tru-space-medium-500);
        vertical-align: middle;
        transition: outline-color 100ms ease-in-out;
        outline-color: transparent;
    }

    :host(:focus) {
        outline: none;
    }

    :host(:focus-visible) #tick {
        outline: 3px solid var(--tru-color-primary-500);
        outline-offset: 3px;
    }

    #tick {
        border-radius: var(--tru-radius-circle-700);
        border: 1px solid var(--tru-color-neutral-400);
        width: var(--tru-size-regular-900);
        aspect-ratio: 1;
        background-color: transparent;
        transition: background-color ease-in-out 100ms;
    }
`;
