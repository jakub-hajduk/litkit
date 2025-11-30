import { LitElement } from 'lit'
import { property } from 'lit/decorators.js'
import { Aria, BaseElementInterface, HostUpdate, Internals } from 'litkit'
import { Constructor, LitConstructor } from '../../types/types'

type FormValue = File | string | FormData | null;

export type CustomFormFieldInterface = {
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  label?: string;
  description?: string;
  emitChange(): void;
  emitInput(): void;
  value: any
};

export const CustomFormField = <Base extends LitConstructor>(superClass: Base) => {
  class CustomFormFieldMixin extends superClass {
    static shadowRootOptions = {mode: 'closed', delegatesFocus: true};
    static formAssociated = true;

    value: FormValue = null;

    @Aria('ariaRequired')
    @property({ type: Boolean, reflect: true })
    required = false;

    @Aria('ariaReadOnly')
    @property({ type: Boolean, reflect: true })
    readOnly = false;

    @Aria('ariaDisabled')
    @property({ type: Boolean, reflect: true })
    disabled = false;

    /**
     * field name for screen readers. This should be used only when field is used without acc-label element.
     */
    @Aria('ariaLabel')
    @property({ type: String, reflect: true, attribute: 'label' })
    label?: string = '';

    /**
     * field description for screen readers. This should be used only when field is used without acc-label element.
     */
    @Aria('ariaDescription')
    @property({ type: String, reflect: true, attribute: 'description' })
    description?: string = '';

    emitChange() {
      const changeEvent = new Event('change', { bubbles: true });
      this.dispatchEvent(changeEvent);
    }

    emitInput() {
      const changeEvent = new InputEvent('input', { bubbles: true });
      this.dispatchEvent(changeEvent);
    }

    connectedCallback(this: this & BaseElementInterface) {
      super.connectedCallback();

      this[HostUpdate].watch<typeof this.value>('value', (value) => {
        this[Internals].setFormValue(value);
        this.emitInput();
        this.emitChange();
      });
    }
  }

  return CustomFormFieldMixin as Constructor<CustomFormFieldInterface> & Base;
};
