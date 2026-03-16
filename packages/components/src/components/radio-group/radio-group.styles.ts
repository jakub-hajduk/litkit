import { css } from 'lit';
export default css`
        :host slot {
            display: inline-block;
            display: flex;
            flex-direction: column;
            gap: var(--lk-space-medium-600);
            position: relative;
        }
        
        ::slotted(*) {
            z-index: 0;
            position: relative;
        }
    
        ::slotted(*:focus) {
            z-index: 1
        }
        
        ::slotted(*:not(:first-child)) {
            margin-left: -1px;
        }
    `;
