import { css } from 'lit';

export default css`
    :host {
        display: block;
    }
    
    :host #container {
        anchor-name: --reference-element;
    }
    
    #dropdown {
        position-anchor: --reference-element;
        padding: 0;
    }
    
    #option-list {
        padding: var(--lk-space-medium-100);
        display: flex;
        flex-direction: column;
        gap: var(--lk-space-medium-100);
    }
    `;
