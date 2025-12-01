import { property } from 'lit/decorators.js'
import { Action, Aria, BaseElementInterface, CustomEventEmitter, Internals, Listen, ListenKeys, State } from 'litkit'
import type { Constructor, LitConstructor } from '../../types/types'

export interface ButtonInterface {
  actionEvent: CustomEventEmitter;
  label?: string;
  description?: string;
  disabled?: boolean;
  submit?: boolean;
  click(): void;
}

export const Button = <Base extends LitConstructor>(superClass: Base) => {
  class ButtonMixin extends superClass {
    actionEvent = new CustomEventEmitter(this, 'action')
    static formAssociated = true

    @Aria('ariaLabel')
    @property({ type: String, reflect: true })
    label?: string;

    @Aria('ariaDescription')
    @property({ type: String, reflect: true })
    description?: string;

    @State('disabled')
    @Aria('ariaDisabled')
    @property({ type: Boolean, reflect: true })
    disabled: boolean = false;

    @property({
      reflect: true,
      type: Boolean
    }) submit?: boolean

    @Action()
    public click(this: this & BaseElementInterface) {

      if (this.disabled) return

      const prevented = !this.actionEvent.emit()

      if (prevented) return

      if (this.submit) {
        this[Internals].form?.requestSubmit()
      }
    }
  }

  return ButtonMixin as Constructor<ButtonInterface> & Base;
};
