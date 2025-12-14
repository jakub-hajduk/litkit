import { property } from 'lit/decorators.js'
import { Aria, InputEventEmitter, State, ChangeEventEmitter, ensureHostEventListener, ensureHostUpdateController } from 'litkit'
import type { Constructor, LitConstructor } from '../../types/types'

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

export const DelegatedFormField = <V extends FormValue = FormValue, Base extends LitConstructor = LitConstructor>(superClass: Base) => {
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

    async firstUpdated() {
      await this.updateComplete;

      if (this._delegatedElement) {
        const HostUpdateListener = ensureHostUpdateController(this)
        const HostEventListener = ensureHostEventListener(this)

        HostUpdateListener.watch('value', (value: string) => {
          (this._delegatedElement as HTMLInputElement).value = value;
        })

        HostEventListener.registerListener('input', (event: Event) => {
          event.stopImmediatePropagation()
          this.value = (event.target as HTMLInputElement).value as any;
          this.inputEvent.emit()
        }, { element: this._delegatedElement })
        .attach()

        HostEventListener.registerListener('change', (event: Event) => {
          event.stopImmediatePropagation()
          this.changeEvent.emit()
        }, { element: this._delegatedElement })
        .attach()

        HostUpdateListener.watch('label', (value: string) => {
          this._delegatedElement?.setAttribute('aria-label', value);
        })

        HostUpdateListener.watch('description', (value: string) => {
          this._delegatedElement?.setAttribute('aria-description', value);
        })
      }
    }
  }

  return DelegatedFormFieldMixin as Constructor<DelegatedFormFieldInterface<V>> & Base;
};
