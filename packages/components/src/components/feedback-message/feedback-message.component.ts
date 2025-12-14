import { css } from "lit";
import { html } from "lit";
import { LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { State } from "litkit";
import { error } from "../icons/error.icon";
import { warning } from "../icons/warning.icon";
import { success } from "../icons/success.icon";
import { info } from "../icons/info.icon";

@customElement('my-feedback-message')
export class MyFeedbackMessage extends LitElement {
  static styles = css`
    :host {
      font-size: 1rem;
      display: flex;
      gap: 0.5rem;
      line-height: 1.5rem;
      align-items: center;
    }

    svg {
        display: block;
        width: 1rem;
        height: 1rem;
        aspect-ratio: 1;
    }

    :host(:state(error)) {
      color: var(--error800);
    }

    :host(:state(warning)) {
      color: var(--warning800);
    }

    :host(:state(success)) {
      color: var(--success800);
    }

    :host(:state(info)) {
      color: var(--info800);
    }

    :host(:state(neutral)) {}
      color: var(--neutral800);
    }
  `;

  @State('error', value => value === 'error')
  @State('warning', value => value === 'warning')
  @State('success', value => value === 'success')
  @State('info', value => value === 'info')
  @State('neutral', value => value === 'neutral')
  @property({type: String, reflect: true})
  variant: 'neutral' | 'success' | 'error' | 'warning' | 'info' = 'neutral';

  get icon() {
    switch (this.variant) {
      case 'error':
        return error;
      case 'warning':
        return warning;
      case 'success':
        return success;
      case 'info':
        return info;
      default:
        return;
    }
  }

  render() {
    return html`
        ${this.icon}
        <slot></slot>
    `;
  }
}
