import type { ReactiveElement } from 'lit';
import { property } from 'lit/decorators.js';
import {
  Action,
  Aria,
  addInitializer,
  ChangeEventEmitter,
  CSSState,
  ensureHostUpdateController,
  ensureInternals,
  InputEventEmitter,
  SlottedText,
} from 'litkit';
import type { Constructor, LitConstructor } from '../types';

export type CheckableFormFieldInterface = {
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
  class CheckableFormFieldMixin extends superClass {
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
    @SlottedText()
    @property({ type: String, attribute: true })
    label: string = '';

    @Aria('ariaDescription')
    @SlottedText('description')
    @property({ type: String, attribute: true })
    description?: string = '';

    @Action()
    handleClick(event: MouseEvent) {
      if (event.target !== this) return;
      event.stopImmediatePropagation();
      (this as any).checked = !(this as any).checked;
    }
  }

  addInitializer(CheckableFormFieldMixin, (instance: ReactiveElement) => {
    const updateListener = ensureHostUpdateController(instance);
    const internals = ensureInternals(instance);

    updateListener.watch('checked', (value, oldValue) => {
      if (value && value !== oldValue) {
        internals.setFormValue(value as any);
        (instance as any).inputEvent?.emit();
        (instance as any).changeEvent?.emit();
      }
    });
  });

  return CheckableFormFieldMixin as Constructor<CheckableFormFieldInterface> &
    Base;
};
