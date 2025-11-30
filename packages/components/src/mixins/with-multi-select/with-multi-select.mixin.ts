import { Constructor, LitConstructor } from '../../types/types'

export interface WithMultiselectInterface {
}

export const WithMultiSelect = <Base extends LitConstructor>(superClass: Base) => {
  class WithMultiSelectMixin extends superClass {
  }

  return WithMultiSelectMixin as Constructor<WithMultiselectInterface> & Base;
};
