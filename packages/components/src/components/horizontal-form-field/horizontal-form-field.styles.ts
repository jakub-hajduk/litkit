import { css } from 'lit';

export default css`
      #horizontal-form-field {
        display: grid;
        grid-template-columns: var(--label-width, 200px) 1fr;
        grid-template-rows: auto 1fr;
        grid-gap: var(--tru-space-medium-700);
        width: 100%;
      }

      #label {
          grid-area: 1 / 1 / 2 / 2;
          align-self: center;
      }

      ::slotted([slot=label]) {
          cursor: pointer;
          font: var(--tru-typography-caption-700);
          color: var(--tru-color-neutral-1200);
      }

      #hint {
          grid-area: 2 / 1 / 3 / 2;
          font: var(--tru-typography-body-500);
          color: var(--tru-color-neutral-800);
      }

      #field{
          grid-area: 1 / 2 / 2 / 3;
      }

      #feedback {
          grid-area: 2 / 2 / 3 / 3;
          font: var(--tru-typography-body-500)
      }
    `;
