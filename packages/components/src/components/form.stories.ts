import type { Meta } from '@storybook/web-components-vite'
import { html } from 'lit'

import '/s'
const meta: Meta = {
  title: 'Form',
}

export default meta;

export const Form = () => {

  return html`<form @change=${console.log}>
      <tru-stack>
          
      </tru-stack>
  </form>`
}
