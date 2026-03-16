import type { Constructor, LitConstructor } from '../types';

export type WithMultiselectInterface = object;

export const WithMultiSelect = <Base extends LitConstructor>(
  superClass: Base,
) => {
  class WithMultiSelectMixin extends superClass {}

  return WithMultiSelectMixin as Constructor<WithMultiselectInterface> & Base;
};
