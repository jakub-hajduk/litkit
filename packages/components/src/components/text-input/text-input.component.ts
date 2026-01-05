import { html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { Focusable } from '../../mixins/focusable/focusable.mixin';
import { DelegatedFormField } from '../../mixins/form/delegated-form-field.mixin';
import { formFieldStyles } from '../../shared/styles/field.styles';
import styles from './text-input.styles';

@customElement('tru-text-input')
export class TextInputComponent extends Focusable(
  DelegatedFormField(LitElement),
) {
  static formAssociated = true;
  static styles = [styles, formFieldStyles()];

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
