import { css } from 'lit';

export default css`
    :host #container {
        display: inline-block;
        font: var(--tru-typography-caption-700);
        padding: calc(var(--tru-space-medium-700) / var(--tru-aspect-ratio)) var(--tru-space-medium-700);
        cursor: pointer;
        border-width: 1px;
        border-style: solid;
        border-radius: var(--tru-radius-rectangle-300);
        transition-duration: 100ms;
        transition-timing-function: ease-in-out;
        transition-property: border-color, color, transform, background-color, outline-color;
        outline-color: transparent;
        user-select: none;
    }

    :host(:focus) {
        outline: none;
    }
    
    :host(:focus-visible) #container {
        outline: 3px solid var(--tru-color-primary-500);
        outline-offset: 3px;
    }

    :host(:active:not(:state(disabled))) #container {
        transform: translateY(2px);
    }
    
    :host(:state(disabled)) #container {
        cursor: default;
    }

    /* Default */
    :host #container,
    :host(:state(default)) #container {
        border-color: var(--tru-color-neutral-500);
        background-color: var(--tru-color-neutral-100);
        color: var(--tru-color-neutral-1200);
    }
    
    :host(:hover) #container,
    :host(:state(default):hover) #container {
        border-color: var(--tru-color-neutral-600);
        background-color: var(--tru-color-neutral-200);
        color: var(--tru-color-neutral-1200);
    }
    
    :host(:active) #container,
    :host(:state(default):active) #container {
        border-color: var(--tru-color-neutral-700);
        background-color: var(--tru-color-neutral-300);
        color: var(--tru-color-neutral-1300);
    }

    :host(:state(disabled)) #container ,
    :host(:state(default):state(disabled)) #container {
        border-color: var(--tru-color-neutral-400);
        background-color: var(--tru-color-neutral-100);
        color: var(--tru-color-neutral-500);
    }

    /* Primary */
    :host(:state(primary)) #container {
        border-color: var(--tru-color-primary-800);
        background-color: var(--tru-color-primary-800);
        color: var(--tru-color-primary-100);
    }
    
    :host(:state(primary):hover) #container {
        border-color: var(--tru-color-primary-900);
        background-color: var(--tru-color-primary-900);
        color: var(--tru-color-primary-200);
    }

    :host(:state(primary):active) #container {
        border-color: var(--tru-color-primary-1000);
        background-color: var(--tru-color-primary-1000);
        color: var(--tru-color-primary-300);
    }
    
    :host(:state(primary):state(disabled)) #container {
        border-color: var(--tru-color-primary-300);
        background-color: var(--tru-color-primary-300);
        color: var(--tru-color-primary-600);
    }

    
    /* Critical */
    :host(:state(critical)) #container {
        border-color: var(--tru-color-critical-800);
        background-color: var(--tru-color-critical-800);
        color: var(--tru-color-critical-100);
    }

    :host(:state(critical):hover) #container {
        border-color: var(--tru-color-critical-900);
        background-color: var(--tru-color-critical-900);
        color: var(--tru-color-critical-200);
    }

    :host(:state(critical):active) #container {
        border-color: var(--tru-color-critical-1000);
        background-color: var(--tru-color-critical-1000);
        color: var(--tru-color-critical-300);
    }

    :host(:state(critical):state(disabled)) #container {
        border-color: var(--tru-color-critical-300);
        background-color: var(--tru-color-critical-300);
        color: var(--tru-color-critical-600);
    }

    /* Ghost */
    :host(:state(ghost)) #container {
        border-color: transparent;
        background-color: transparent;
        color: var(--tru-color-neutral-1000);
    }

    :host(:state(ghost):hover) #container {
        border-color: transparent;
        background-color: transparent;
        color: var(--tru-color-neutral-1200);
    }

    :host(:state(ghost):active) #container {
        border-color: transparent;
        background-color: transparent;
        color: var(--tru-color-neutral-1300);
    }
    
    :host(:state(ghost):state(disabled)) #container {
        border-color: transparent;
        background-color: transparent;
        color: var(--tru-color-neutral-600);
    }
`;
