import { Constructor, LitConstructor } from '../../types/types'

export interface WithSingleSelectInterface {
}

export const WithSingleSelect = <Base extends LitConstructor>(superClass: Base) => {
  class WithSingleSelectMixin extends superClass {
  }

  return WithSingleSelectMixin as Constructor<WithSingleSelectInterface> & Base;
};
