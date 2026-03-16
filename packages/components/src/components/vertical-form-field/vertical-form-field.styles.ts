import { css } from 'lit';

export default css`
      #vertical-form-field {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: var(--lk-space-medium-100);
        width: 100%;
      }

      ::slotted([slot=label]) {
          cursor: pointer;
          font: var(--lk-typography-caption-700);
          color: var(--lk-color-neutral-1200);
      }

      #hint {
        font: var(--lk-typography-body-500);
        color: var(--lk-color-neutral-800);
      }

      #field{
        width: 100%;
      }

      #feedback {
        font: var(--lk-typography-body-500)
      }
    `;
