import { type TemplateResult, LitElement, css } from "lit";
import { customElement } from "lit/decorators.js";
import { html } from "lit/static-html.js";
import { SlottedElements, SlottedText, Role } from "litkit";
import type { CustomFormFieldInterface } from "../../mixins/form/custom-form-field.mixin";
import type { DelegatedFormFieldInterface } from "../../mixins/form/delegated-form-field.mixin";

@Role('presentation')
@customElement('my-vertical-form-field')
export class MyVerticalFormField extends LitElement {
  static styles = [
    css`
      #vertical-form-field {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
        width: 100%;
      }

      ::slotted([slot=label]) {
          cursor: pointer;
          color: var(--neutral1000);
          font-weight: 500 !important;
      }

      #hint {
        font-size: 0.9rem;
        color: var(--neutral500);
      }

      #field{
        width: 100%;
      }

      #feedback {
        font-size: 0.9rem;
      }
    `
  ]

  get field(): HTMLElement | HTMLElement & CustomFormFieldInterface | HTMLElement & DelegatedFormFieldInterface<any> {
    return this.defaultSlottElements.at(0) as HTMLElement
  }

  get isFieldRequired(): boolean {
    return (this.field && 'required' in this.field && this.field.required) || false;
  }

  @SlottedElements()
  private defaultSlottElements: HTMLElement[] = []

  @SlottedText('label')
  private slottedLabelText: string | null = null

  @SlottedText('hint')
  private slottedHintText: string | null = null

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
