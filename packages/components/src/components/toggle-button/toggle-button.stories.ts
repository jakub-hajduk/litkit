import type { Meta } from '@storybook/web-components-vite';
import { html } from 'lit/static-html.js';
import './toggle-button.component';
import '../toggle-button-group/toggle-button-group.component';

const meta: Meta = {
  title: 'Components/Toggle Button',
  component: 'tru-toggle-button',
};

export default meta;

export const Default = () => html`
    <tru-toggle-button-group>
      <tru-toggle-button value="OptionValue">This is one of the options</tru-toggle-button>
      <tru-toggle-button value="OptionValue">This is one of the options</tru-toggle-button>
      <tru-toggle-button value="OptionValue">This is one of the options</tru-toggle-button>
    </tru-toggle-button-group>
`;
