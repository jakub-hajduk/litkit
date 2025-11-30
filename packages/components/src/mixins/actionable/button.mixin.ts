import { property } from 'lit/decorators.js'
import { Aria, CustomEventEmitter, Internals, Listen, ListenKeys, State } from 'litkit'
import type { BaseComponentConstructor } from '../../components/base/base.component'
import type { Constructor } from '../../types/types'

export interface ButtonInterface {
  label?: string;
  description?: string;
  disabled?: boolean;
  submit?: boolean;
  value?: string | number;
  click(value?: string | number): void;
}

export const Button = <Base extends BaseComponentConstructor>(superClass: Base) => {
  class ButtonMixin extends superClass {
    action = new CustomEventEmitter(this, 'action')
    static formAssociated = true

    @Aria('ariaLabel')
    @property({ type: String, reflect: true })
    label?: string;

    @Aria('ariaDescription')
    @property({ type: String, reflect: true })
    description?: string;

    /**
     * Whether button is disabled or not
     */
    @State('disabled')
    @Aria('ariaDisabled')
    @property({ type: Boolean, reflect: true })
    disabled: boolean = false;

    @property({
      reflect: true,
      type: Boolean
    }) submit?: boolean

    @property({
      reflect: true,
      type: String
    }) value?: string | number

    @Listen('click')
    @Listen('touchend')
    @ListenKeys('keydown', ['Space', 'Enter'])
    public click(value?: string | number) {
      if (value) this.value = value

      if (this.disabled) return

      const prevented = !this.action.emit(this.value)

      if (prevented) return

      if (this.submit) {
        this[Internals].form?.requestSubmit()
      }
    }
  }

  return ButtonMixin as Constructor<ButtonInterface> & Base;
};
