import type { ReactiveElement } from 'lit';
import { property } from 'lit/decorators.js';
import {
  Aria,
  addInitializer,
  ChangeEventEmitter,
  CSSState,
  ensureHostUpdateController,
  ensureInternals,
  InputEventEmitter,
} from 'litkit';
import type { Constructor, LitConstructor } from '../../types/types';

export type CustomFormFieldInterface = {
  inputEvent: InputEventEmitter;
  changeEvent: ChangeEventEmitter;
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  label?: string;
  description?: string;
};

export const CustomFormField = <Base extends LitConstructor>(
  superClass: Base,
) => {
  class CustomFormFieldMixin extends superClass {
    static shadowRootOptions = { mode: 'closed' };
    static formAssociated = true;

    public inputEvent = new InputEventEmitter(this);
    public changeEvent = new ChangeEventEmitter(this);

    @CSSState('required')
    @Aria('ariaRequired')
    @property({ type: Boolean, reflect: true })
    required = false;

    @CSSState('readonly')
    @Aria('ariaReadOnly')
    @property({ type: Boolean, reflect: true })
    readOnly = false;

    @CSSState('disabled')
    @Aria('ariaDisabled')
    @property({ type: Boolean, reflect: true })
    disabled = false;

    @Aria('ariaLabel')
    @property({ type: String, reflect: true })
    label?: string = '';

    @Aria('ariaDescription')
    @property({ type: String, reflect: true })
    description?: string = '';
  }

  addInitializer(CustomFormFieldMixin, (instance: ReactiveElement) => {
    const updateListener = ensureHostUpdateController(instance);
    const internals = ensureInternals(instance);

    updateListener.watch('value', (value) => {
      internals.setFormValue(value as any);
      (instance as any).inputEvent?.emit();
      (instance as any).changeEvent?.emit();
    });
  });

  return CustomFormFieldMixin as Constructor<CustomFormFieldInterface> & Base;
};
