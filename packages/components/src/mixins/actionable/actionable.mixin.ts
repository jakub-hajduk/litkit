import { property } from 'lit/decorators.js'
import { CustomEventEmitter, Listen, ListenKeys } from 'litkit'
import type { BaseComponentConstructor } from '../../components/base/base.component'
import type { Constructor } from '../../types/types'

export interface ActionableInterface {
  value?: string | number
  click(value?: string | number): void;
}

export const Actionable = <Base extends BaseComponentConstructor>(superClass: Base) => {
  class ActionableMixin extends superClass {
    action = new CustomEventEmitter(this, 'action')

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
