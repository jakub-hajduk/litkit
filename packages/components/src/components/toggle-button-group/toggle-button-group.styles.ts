import { css } from 'lit';
export default css`
        :host slot {
            display: inline-block;
            display: flex;
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
