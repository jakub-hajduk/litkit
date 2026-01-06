import { css } from 'lit';

export default css`
      #vertical-form-field {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: var(--tru-space-medium-100);
        width: 100%;
      }

      ::slotted([slot=label]) {
          cursor: pointer;
          font: var(--tru-typography-caption-700);
          color: var(--tru-color-neutral-1200);
      }

      #hint {
        font: var(--tru-typography-body-500);
        color: var(--tru-color-neutral-800);
      }

      #field{
        width: 100%;
      }

      #feedback {
        font: var(--tru-typography-body-500)
      }
    `;
