import { LitElement } from 'lit'
import { BaseElementInterface, initializeBase } from 'litkit'
import type { Constructor } from '../../types/types'

export interface BaseInterface extends BaseElementInterface {
}

export const Base = <Base extends Constructor<LitElement>>(superClass: Base) => {
  class BaseMixin extends superClass {
    static shadowRootOptions = {mode: 'closed' as ShadowRootMode };

    constructor(...args: any[]) {
      super(...args)
      initializeBase(this)
    }
  }

  return BaseMixin as (Base & Constructor<BaseInterface> & {  shadowRootOptions: ShadowRootInit });
};
