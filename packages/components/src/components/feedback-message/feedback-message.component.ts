import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { CSSState } from 'litkit';
import { error } from '../icons/error.icon';
import { info } from '../icons/info.icon';
import { success } from '../icons/success.icon';
import { warning } from '../icons/warning.icon';
import styles from './feedback-message.styles';

@customElement('tru-feedback-message')
export class FeedbackMessageComponent extends LitElement {
  static styles = [styles];

  @CSSState('critical', (value) => value === 'critical')
  @CSSState('caution', (value) => value === 'caution')
  @CSSState('positive', (value) => value === 'positive')
  @CSSState('info', (value) => value === 'info')
  @CSSState('default', (value) => value === 'default')
  @property({ type: String, reflect: true })
  variant: 'default' | 'positive' | 'critical' | 'caution' | 'info' = 'default';

  get icon() {
    switch (this.variant) {
      case 'critical':
        return error;
      case 'caution':
        return warning;
      case 'positive':
        return success;
      case 'info':
        return info;
      default:
        return html``;
    }
  }

  render() {
    return html`
        ${this.icon}
        <slot></slot>
    `;
  }
}
