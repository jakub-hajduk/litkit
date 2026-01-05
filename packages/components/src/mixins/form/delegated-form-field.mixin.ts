import type { ReactiveElement } from 'lit';
import { property } from 'lit/decorators.js';
import {
  Aria,
  addInitializer,
  ChangeEventEmitter,
  CSSState,
  ensureHostEventListener,
  ensureHostUpdateController,
  InputEventEmitter,
} from 'litkit';
import type { Constructor, LitConstructor } from '../../types/types';

type FormValue = File | string | FormData | null;

export type DelegatedFormFieldInterface = {
  inputEvent: InputEventEmitter;
  changeEvent: ChangeEventEmitter;
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  label?: string;
  description?: string;
  _delegatedElement?: HTMLElement;
  value?: FormValue;
};

export const DelegatedFormField = <Base extends LitConstructor>(
  superClass: Base,
) => {
  class DelegatedFormFieldMixin extends superClass {
    static shadowRootOptions = { mode: 'closed', delegatesFocus: true };
    static formAssociated = true;

    public inputEvent = new InputEventEmitter(this);
    public changeEvent = new ChangeEventEmitter(this);

    _delegatedElement: any;

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
    @property({ type: String, reflect: true, attribute: 'label' })
    label?: string;

    @Aria('ariaDescription')
    @property({ type: String, reflect: true, attribute: 'description' })
    description?: string;
  }

  addInitializer(DelegatedFormFieldMixin, (instance: ReactiveElement) => {
    const typedInstance = instance as ReactiveElement &
      DelegatedFormFieldInterface;

    typedInstance.updateComplete.then(() => {
      const HostUpdateListener = ensureHostUpdateController(typedInstance);
      const HostEventListener = ensureHostEventListener(typedInstance);

      HostUpdateListener.watch('value', (value: string) => {
        (typedInstance._delegatedElement as HTMLInputElement).value =
          value || '';
      });

      HostEventListener.registerListener(
        'input',
        (event: Event) => {
          event.stopImmediatePropagation();
          typedInstance.value = (event.target as HTMLInputElement).value as any;
          typedInstance.inputEvent.emit();
        },
        { element: typedInstance._delegatedElement },
      ).attach();

      HostEventListener.registerListener(
        'change',
        (event: Event) => {
          event.stopImmediatePropagation();
          typedInstance.value = (event.target as HTMLInputElement).value as any;
          typedInstance.changeEvent.emit();
        },
        { element: typedInstance._delegatedElement },
      ).attach();

      HostUpdateListener.watch('label', (value: string) => {
        if (value === null || value === undefined) {
          typedInstance._delegatedElement?.removeAttribute('aria-label');
        } else {
          typedInstance._delegatedElement?.setAttribute('aria-label', value);
        }
      });

      HostUpdateListener.watch('description', (value: string) => {
        if (value === null || value === undefined) {
          typedInstance._delegatedElement?.removeAttribute('aria-description');
        } else {
          typedInstance._delegatedElement?.setAttribute(
            'aria-description',
            value,
          );
        }
      });
    });
  });

  return DelegatedFormFieldMixin as Constructor<DelegatedFormFieldInterface> &
    Base;
};
