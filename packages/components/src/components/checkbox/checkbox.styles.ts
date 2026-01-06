import { css } from 'lit';

export default css`
    :host {
        cursor: pointer;
        display: inline-block
    }
    
    :host(:state(checked)) #tick {
        background-color: var(--tru-color-neutral-400);   
    }
    
    #container {
        display: inline-block;
        vertical-align: middle;
        aspect-ratio: 1; 
        width: fit-content;
        padding: 4px;
        border-radius: var(--tru-radius-rectangle-700);
        corner-shape: squircle;
        border: 1px solid var(--tru-color-neutral-400);
        min-height: var(--tru-size-regular-900);
        transition: outline-color 100ms ease-in-out;
        outline-color: transparent;
    }

    :host(:focus) {
        outline: none;
    }

    :host(:focus-visible) #container {
        outline: 3px solid var(--tru-color-primary-500);
        outline-offset: 3px;
    }

    #tick {
        aspect-ratio: 1;
        background-color: transparent;
        transition: background-color ease-in-out 100ms;
        border-radius: var(--tru-radius-rectangle-300);
    }
`;
