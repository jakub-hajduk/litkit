import { html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { Focusable } from '../../mixins/focusable/focusable.mixin';
import { DelegatedFormField } from '../../mixins/form/delegated-form-field.mixin';
import { formFieldStyles } from '../../shared/styles/field.styles';

@customElement('tru-number-input')
export class NumberInputComponent extends Focusable(
  DelegatedFormField(LitElement),
) {
  static formAssociated = true;
  static styles = [formFieldStyles()];

  @query('input', true)
  _delegatedElement?: HTMLInputElement;

  @property({ type: String, reflect: true })
  value?: string;

  render() {
    return html`<div id="container">
        <input type="number" .value=${this.value || ''} />
    </div>`;
  }
}
