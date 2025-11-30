import type { BaseComponentConstructor } from '../../components/base/base.component'
import type { Constructor } from '../../types/types'

export interface BlankInterface {
}

export const Blank = <Base extends BaseComponentConstructor>(superClass: Base) => {
  class BlankMixin extends superClass {
  }

  return BlankMixin as Constructor<BlankInterface> & Base;
};
