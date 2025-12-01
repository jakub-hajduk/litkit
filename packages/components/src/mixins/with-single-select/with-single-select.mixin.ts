import { property } from 'lit/decorators.js'
import { Listen } from 'litkit'
import { Constructor, LitConstructor } from '../../types/types'

export interface WithSingleSelectInterface {
}

export const WithSingleSelect = <Base extends LitConstructor>(superClass: Base) => {
  class WithSingleSelectMixin extends superClass {
    @property({ type: String, reflect: true })
    value?: string;

    currentlySelectedTarget?: any;

    @Listen('selected')
    itemSelected(event: CustomEvent) {
      if ( this.currentlySelectedTarget) {
        this.currentlySelectedTarget.selected = false
      }
      this.value = event.detail
      this.currentlySelectedTarget = event.target
    }
  }

  return WithSingleSelectMixin as Constructor<WithSingleSelectInterface> & Base;
};
