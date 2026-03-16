import type { Constructor, LitConstructor } from './types';

export type BlankInterface = object;

export const Blank = <Base extends LitConstructor>(superClass: Base) => {
  class BlankMixin extends superClass {}

  return BlankMixin as Constructor<BlankInterface> & Base;
};
