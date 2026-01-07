import { html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { Focusable } from '../../mixins/focusable/focusable.mixin';
import { DelegatedFormField } from '../../mixins/form/delegated-form-field.mixin';
import { formFieldStyles } from '../../shared/styles/field.styles';
import { focusStyles } from '../../shared/styles/focus.styles';

@customElement('tru-tel-input')
export class TelInputComponent extends Focusable(
  DelegatedFormField(LitElement),
) {
  static formAssociated = true;
  static styles = [formFieldStyles(), focusStyles()];

  @query('input', true)
  _delegatedElement?: HTMLInputElement;

  @property({ type: String, reflect: true })
  value?: string;

  render() {
    return html`<div id="container">
        <input type="tel" .value=${this.value || ''} />
    </div>`;
  }
}
