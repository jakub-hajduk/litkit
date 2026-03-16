import { css } from 'lit';

export default css`
    :host {
        display: block;
        cursor: pointer;
    }
    
    :host #container {
        border-radius: 0;
    }
    
    :host(:is(:first-of-type)) #container {
        border-radius: var(--lk-radius-rectangle-300) 0 0 var(--lk-radius-rectangle-300);
    }
    
    :host(:is(:last-of-type)) #container {
        border-radius: 0 var(--lk-radius-rectangle-300) var(--lk-radius-rectangle-300) 0;
    }

    :host(:state(selected)) #container {
        border-color: var(--lk-color-primary-800);
        background-color: var(--lk-color-primary-800);
        color: var(--lk-color-primary-100);
    }

    :host(:state(selected):hover) #container {
        border-color: var(--lk-color-primary-900);
        background-color: var(--lk-color-primary-900);
        color: var(--lk-color-primary-200);
    }

    :host(:state(selected):active) #container {
        border-color: var(--lk-color-primary-1000);
        background-color: var(--lk-color-primary-1000);
        color: var(--lk-color-primary-300);
    }

    :host(:state(selected):state(disabled)) #container {
        border-color: var(--lk-color-primary-300);
        background-color: var(--lk-color-primary-300);
        color: var(--lk-color-primary-600);
    }
`;
