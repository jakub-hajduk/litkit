import { LitElement, ReactiveElement } from 'lit'
import { property } from 'lit/decorators.js'
import { Aria, BaseElementInterface, HostEventListener, HostUpdateListener, InputEventEmitter, State, addInitializer, ChangeEventEmitter } from 'litkit'
import { Constructor, LitConstructor } from '../../types/types'

type FormValue = File | string | FormData | null;

export type DelegatedFormFieldInterface<V> = {
  inputEvent: InputEventEmitter;
  changeEvent: ChangeEventEmitter;
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  label?: string;
  description?: string;
  _delegatedElement?: HTMLElement | null;
  value: V
};

export const DelegatedFormField = <V extends FormValue = FormValue, Base extends LitConstructor & Constructor<BaseElementInterface> = Constructor<BaseElementInterface & LitElement>>(superClass: Base) => {
  class DelegatedFormFieldMixin extends superClass {
    static shadowRootOptions = {mode: 'closed', delegatesFocus: true};
    static formAssociated = true;

    public inputEvent = new InputEventEmitter(this)
    public changeEvent = new ChangeEventEmitter(this)

    _delegatedElement: any;
    value: any;

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
    @property({ type: String, reflect: true, attribute: 'label' })
    label?: string;

    @Aria('ariaDescription')
    @property({ type: String, reflect: true, attribute: 'description' })
    description?: string;

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
        this[HostUpdateListener].watch('value', (value: string) => {
          (this._delegatedElement as HTMLInputElement).value = value;
        })

        this[HostEventListener].registerListener('input', (event: Event) => {
          event.stopImmediatePropagation()
          this.value = (event.target as HTMLInputElement).value as any;
          this.inputEvent.emit()
        }, { element: this._delegatedElement })
        .attach()

        this[HostEventListener].registerListener('change', (event: Event) => {
          event.stopImmediatePropagation()
          this.changeEvent.emit()
        }, { element: this._delegatedElement })
        .attach()

        this[HostUpdateListener].watch('label', (value: string) => {
          this._delegatedElement?.setAttribute('aria-label', value);
        })

        this[HostUpdateListener].watch('description', (value: string) => {
          this._delegatedElement?.setAttribute('aria-description', value);
        })
      }
    }
  }

  return DelegatedFormFieldMixin as Constructor<DelegatedFormFieldInterface<V>> & Base;
};
