import type { Meta } from '@storybook/web-components-vite';
import { html } from 'lit/static-html.js';
import './radio.component';
import '../radio-group/radio-group.component';

const meta: Meta = {
  title: 'Components/Radio',
  component: 'lk-radio',
};

export default meta;

export const Default = () => html`
    <lk-radio-group>
      <lk-radio value="1">One</lk-radio>
      <lk-radio value="2" label="own label">Two</lk-radio>
      <lk-radio value="3">Three</lk-radio>
    </lk-radio-group>
`;
