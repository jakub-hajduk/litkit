import { LitElement } from 'lit'
import { property } from 'lit/decorators.js'
import { Aria, BaseElementInterface, HostListener, HostUpdate } from 'litkit'
import { Constructor } from '../../types/types'

type FormValue = File | string | FormData | null;

export type DelegatedFormFieldInterface<V> = {
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  label?: string;
  description?: string;
  _delegatedElement?: HTMLElement | null;
  emitChange(): void;
  emitInput(): void;
  value: V
};

export const DelegatedFormField = <V extends FormValue = FormValue, Base extends Constructor<BaseElementInterface & LitElement> = Constructor<BaseElementInterface & LitElement>>(superClass: Base) => {
  class DelegatedFormFieldMixin extends superClass {
    static shadowRootOptions = {mode: 'closed', delegatesFocus: true};
    static formAssociated = true;

    _delegatedElement: any;
    value: any;

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

    async firstUpdated(this: DelegatedFormFieldInterface<V> & BaseElementInterface & LitElement) {
      await this.updateComplete;

      if (this._delegatedElement) {
        this[HostUpdate].watch('value', (value: string) => {
          (this._delegatedElement as HTMLInputElement).value = value;
        })

        this[HostListener].registerListener('input', (event: Event) => {
          event.stopImmediatePropagation()
          this.value = (event.target as HTMLInputElement).value as any;
          this.emitInput()
        }, { element: this._delegatedElement })
        .attach()

        this[HostListener].registerListener('change', (event: Event) => {
          event.stopImmediatePropagation()
          this.emitChange()
        }, { element: this._delegatedElement })
        .attach()

        this[HostUpdate].watch('label', (value: string) => {
          this._delegatedElement?.setAttribute('aria-label', value);
        })

        this[HostUpdate].watch('description', (value: string) => {
          this._delegatedElement?.setAttribute('aria-description', value);
        })
      }
    }
  }

  return DelegatedFormFieldMixin as Constructor<DelegatedFormFieldInterface<V>> & Base;
};
