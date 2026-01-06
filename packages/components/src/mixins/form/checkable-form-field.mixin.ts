import type { ReactiveElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import {
  Aria,
  addInitializer,
  ChangeEventEmitter,
  CSSState,
  ensureHostUpdateController,
  ensureInternals,
  InputEventEmitter,
} from 'litkit';
import { SlottedText } from 'litkit'
import { Action } from 'litkit'
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

export const CheckableFormField = <Base extends LitConstructor>(
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

    @property({ type: String, reflect: true })
    label?: string = '';

    @property({ type: String, reflect: true })
    description?: string = '';

    @Aria('ariaLabel')
    @SlottedText()
    @state()
    finalLabel: string = ''

    @Aria('ariaDescription')
    @SlottedText('description')
    @state()
    finalDescription: string = ''

    @Action()
    handleClick(event: MouseEvent) {
      if (event.target !== this) return;
      event.stopImmediatePropagation();
      (this as any).checked = !(this as any).checked;
    }
  }

  addInitializer(CustomFormFieldMixin, (instance: ReactiveElement) => {
    const updateListener = ensureHostUpdateController(instance);
    const internals = ensureInternals(instance);

    updateListener.watch('label', (value, oldValue) => {
      if (value && value !== oldValue) {
        (instance as any).finalLabel = value;
      }
    })

    updateListener.watch('description', (value, oldValue) => {
      if (value && value !== oldValue) {
        (instance as any).finalDescription = value;
      }
    })

    updateListener.watch('checked', (value, oldValue) => {
      if (value && value !== oldValue) {
        internals.setFormValue(value as any);
        (instance as any).inputEvent?.emit();
        (instance as any).changeEvent?.emit();
      }
    });
  });

  return CustomFormFieldMixin as Constructor<CustomFormFieldInterface> & Base;
};
