import { property } from 'lit/decorators.js'
import { CustomEventEmitter, Listen, ListenKeys } from 'litkit'
import type { Constructor, LitConstructor } from '../../types/types'

export interface ActionableInterface {
  action: CustomEventEmitter
  value?: string | number
  click(value?: string | number): void;
}

export const Actionable = <Base extends LitConstructor>(superClass: Base) => {
  class ActionableMixin extends superClass {
    action: CustomEventEmitter = new CustomEventEmitter(this as any, 'action')

    @property({
      reflect: true,
      type: String
    }) value?: string | number

    @Listen('click')
    @Listen('touchend')
    @ListenKeys('keydown', ['Space', 'Enter'])
    public click(value?: string | number) {
      if (value) this.value = value
    }
  }

  return ActionableMixin as Constructor<ActionableInterface> & Base;
};
