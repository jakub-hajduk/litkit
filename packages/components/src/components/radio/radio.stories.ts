import type { Meta } from '@storybook/web-components-vite';
import { html } from 'lit/static-html.js';
import './radio.component';
import '../radio-group/radio-group.component';

const meta: Meta = {
  title: 'Components/Radio',
  component: 'tru-radio',
};

export default meta;

export const Default = () => html`
    <tru-radio-group>
      <tru-radio value="1">One</tru-radio>
      <tru-radio value="2" label="own label">Two</tru-radio>
      <tru-radio value="3">Three</tru-radio>
    </tru-radio-group>
`;
