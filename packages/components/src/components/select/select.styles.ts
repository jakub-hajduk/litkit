import { css } from 'lit';

export default css`
    :host {
        anchor-name: --reference-element;
    }
    
    #dropdown {
        position-anchor: --reference-element;
        padding: 0;
    }
    
    #option-list {
        padding: var(--tru-space-medium-100);
        display: flex;
        flex-direction: column;
        gap: var(--tru-space-medium-100);
    }
    `;
