import { css, LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';
import { Role, SlottedElements, SlottedText } from 'litkit';
import type { CustomFormFieldInterface } from '../../mixins/form/custom-form-field.mixin';
import type { DelegatedFormFieldInterface } from '../../mixins/form/delegated-form-field.mixin';
import styles from './vertical-form-field.styles';

@Role('presentation')
@customElement('tru-vertical-field')
export class MyVerticalFormField extends LitElement {
  static styles = [styles];

  get field():
    | HTMLElement
    | (HTMLElement & CustomFormFieldInterface)
    | (HTMLElement & DelegatedFormFieldInterface) {
    return this.defaultSlottElements.at(0) as HTMLElement;
  }

  get isFieldRequired(): boolean {
    return (
      (this.field && 'required' in this.field && this.field.required) || false
    );
  }

  @SlottedElements()
  private defaultSlottElements: HTMLElement[] = [];

  @SlottedText('label')
  private slottedLabelText: string | null = null;

  @SlottedText('hint')
  private slottedHintText: string | null = null;

  handleLabelClick() {
    this.field.focus();
  }

  async updated(_changedProperties: Map<string, unknown>): Promise<void> {
    super.updated(_changedProperties);
    await this.updateComplete;

    if ('label' in this.field && this.slottedLabelText) {
      this.field.label = this.slottedLabelText;
    }

    if ('description' in this.field && this.slottedHintText) {
      this.field.description = this.slottedHintText;
    }
  }

  render(): TemplateResult {
    return html`
      <div id="vertical-form-field">
        <div id="label" @click=${this.handleLabelClick}>
          <slot name="label"></slot>
        </div>
        <div id="hint">
          <slot name="hint"></slot>
        </div>
        <div id="field">
          <slot></slot>
        </div>
        <div id="feedback">
          <slot name="feedback"></slot>
        </div>
      </div>
    `;
  }
}
