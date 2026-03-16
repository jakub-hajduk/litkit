import { html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { Focusable } from 'litkit-primitives';
import { DelegatedFormField } from 'litkit-primitives';
import { formFieldStyles } from '../../shared/styles/field.styles';
import { focusStyles } from '../../shared/styles/focus.styles';
import styles from './text-input.styles';

@customElement('lk-text-input')
export class TextInputComponent extends Focusable(
  DelegatedFormField(LitElement),
) {
  static formAssociated = true;
  static styles = [styles, formFieldStyles(), focusStyles()];

  @query('input', true)
  _delegatedElement?: HTMLInputElement;

  @property({ type: String, reflect: true })
  value?: string;

  render() {
    return html`<div id="container">
        <input type="text" .value=${this.value || ''} />
    </div>`;
  }
}
