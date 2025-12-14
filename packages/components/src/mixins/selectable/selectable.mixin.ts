import { property } from 'lit/decorators.js'
import { Aria, CustomEventEmitter, State } from 'litkit'
import type { Constructor, LitConstructor, MaybePromise } from '../../types/types'

export interface SelectableInterface {
  selectedEvent: CustomEventEmitter;
  selected: boolean;
  value?: string | number;
  canSelect?(): MaybePromise<boolean>;
  afterSelect?(): MaybePromise<void>;
  select(): Promise<void>;
}

export const Selectable = <Base extends LitConstructor>(superClass: Base) => {
  class SelectableMixin extends superClass implements SelectableInterface {
    selectedEvent = new CustomEventEmitter(this, 'selected', {bubbles: true, composed: true})

    @Aria('ariaSelected')
    @State('selected')
    @property({ type: Boolean, reflect: true })
    selected = false;

    @property({
      reflect: true,
      type: String
    }) value?: string | number

    public async select(this: SelectableInterface): Promise<void> {
      if (this.canSelect && !(await Promise.resolve(this.canSelect?.call(this)))) return

      const prevented = !this.selectedEvent.emit(this.value)
      if (prevented) return

      this.selected = !this.selected

      if (this.afterSelect) await Promise.resolve(this.afterSelect())
    }
  }

  return SelectableMixin as Constructor<SelectableInterface> & Base;
};
