import type { Meta } from '@storybook/web-components-vite';
import { html } from 'lit/static-html.js';
import './toggle-button.component';
import '../toggle-button-group/toggle-button-group.component';

const meta: Meta = {
  title: 'Components/Toggle Button',
  component: 'lk-toggle-button',
};

export default meta;

export const Default = () => html`
    <lk-toggle-button-group>
      <lk-toggle-button value="OptionValue">This is one of the options</lk-toggle-button>
      <lk-toggle-button value="OptionValue">This is one of the options</lk-toggle-button>
      <lk-toggle-button value="OptionValue">This is one of the options</lk-toggle-button>
    </lk-toggle-button-group>
`;
