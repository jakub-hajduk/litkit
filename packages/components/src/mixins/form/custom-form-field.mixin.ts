import { property } from 'lit/decorators.js'
import { Aria, BaseElementInterface, HostUpdateListener, Internals, State } from 'litkit'
import { Constructor, LitConstructor } from '../../types/types'

export type CustomFormFieldInterface = {
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  label?: string;
  description?: string;
  emitChange(): void;
  emitInput(): void;
};

export const CustomFormField = <Base extends LitConstructor>(superClass: Base) => {
  class CustomFormFieldMixin extends superClass {
    static shadowRootOptions = {mode: 'closed'};
    static formAssociated = true;

    @State('required')
    @Aria('ariaRequired')
    @property({ type: Boolean, reflect: true })
    required = false;

    @State('readonly')
    @Aria('ariaReadOnly')
    @property({ type: Boolean, reflect: true })
    readOnly = false;

    @State('disabled')
    @Aria('ariaDisabled')
    @property({ type: Boolean, reflect: true })
    disabled = false;

    @Aria('ariaLabel')
    @property({ type: String, reflect: true })
    label?: string = '';

    @Aria('ariaDescription')
    @property({ type: String, reflect: true })
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

      this[HostUpdateListener].watch<typeof this.value>('value', (value) => {
        this[Internals].setFormValue(value);
        this.emitInput();
        this.emitChange();
      });
    }
  }

  return CustomFormFieldMixin as Constructor<CustomFormFieldInterface> & Base;
};
