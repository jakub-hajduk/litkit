import { LitElement } from 'lit'
import { Listen } from 'litkit'
import type { Constructor, LitConstructor } from '../../types/types'
import type { SelectableInterface } from '../selectable/selectable.mixin'


export type OptionElement =  LitElement & SelectableInterface

export interface WithSingleSelectInterface {
  value?: unknown
  currentlySelectedTarget: OptionElement | undefined
}

export const WithSingleSelect = <Base extends LitConstructor>(superClass: Base) => {
  class WithSingleSelectMixin extends superClass {
    currentlySelectedTarget: OptionElement | undefined = undefined;

    @Listen('selected', {eventId: 'WithSingleSelect:selected'})
    private itemSelected(event: CustomEvent) {
      if ( this.currentlySelectedTarget) {
        this.currentlySelectedTarget.selected = false
      }
      if ('value' in this) {
        this.value = event.detail
      }
      this.currentlySelectedTarget = event.target as OptionElement;
    }
  }

  return WithSingleSelectMixin as (Constructor<WithSingleSelectInterface> & Base);
};
