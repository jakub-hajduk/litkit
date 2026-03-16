import type { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import './button.component';

const meta: Meta = {
  title: 'Components/Button',
  component: 'lk-button',
};

export default meta;

export const Button = () => html`
    <lk-button>Button</lk-button>
    <lk-button variant="primary">Primary</lk-button>
    <lk-button variant="critical">Critical</lk-button>
    <lk-button variant="ghost">Ghost</lk-button>
    <br>
    <br>
    <lk-button disabled>Button</lk-button>
    <lk-button disabled variant="primary">Primary</lk-button>
    <lk-button disabled variant="critical">Critical</lk-button>
    <lk-button disabled variant="ghost">Ghost</lk-button>
`;
