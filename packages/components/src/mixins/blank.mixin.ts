import { Constructor, LitConstructor } from '../types/types'

export interface BlankInterface {
}

export const Blank = <Base extends LitConstructor>(superClass: Base) => {
  class BlankMixin extends superClass {
  }

  return BlankMixin as Constructor<BlankInterface> & Base;
};
