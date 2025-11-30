import { Constructor, LitConstructor } from '../../types/types'

export interface SelectableInterface {
}

export const Selectable = <Base extends LitConstructor>(superClass: Base) => {
  class SelectableMixin extends superClass {
  }

  return SelectableMixin as Constructor<SelectableInterface> & Base;
};
