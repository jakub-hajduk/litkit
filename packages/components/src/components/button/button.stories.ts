import type { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import './button.component';

const meta: Meta = {
  title: 'Components/Button',
  component: 'my-button',
};

export default meta;

export const Button = () => html`
    <tru-button>Button</tru-button>
    <tru-button variant="primary">Primary</tru-button>
    <tru-button variant="critical">Critical</tru-button>
    <tru-button variant="ghost">Ghost</tru-button>
    <br>
    <br>
    <tru-button disabled>Button</tru-button>
    <tru-button disabled variant="primary">Primary</tru-button>
    <tru-button disabled variant="critical">Critical</tru-button>
    <tru-button disabled variant="ghost">Ghost</tru-button>
`;
