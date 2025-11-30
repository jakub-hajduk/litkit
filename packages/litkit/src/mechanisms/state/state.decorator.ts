import { LitElement, ReactiveElement } from 'lit';
import { initializeBase } from '../initialize/initialize'
import { Internals } from '../internals/internals';
import { HostUpdate } from '../update/update.controller';
import type { ConverterFn } from './types'

export function State(state: string, converter?: ConverterFn): PropertyDecorator {
  return function <ElementClass extends LitElement>(
    target: ElementClass,
    decoratedPropName: keyof ElementClass
  ): void {
    const constructor = target.constructor as typeof ReactiveElement;
    constructor.addInitializer((inst: ReactiveElement) => {
      const instance = initializeBase(inst)
        const internals = instance[Internals]
        const update = instance[HostUpdate]

        update.watch(decoratedPropName, (value) => {
          const isState = converter ? converter(value) : Boolean(value);

          if (isState) {
            // @ts-ignore
            internals.states.add(state);
          } else {
            // @ts-ignore
            internals.states.delete(state);
          }
        });
      }
    );
  } as PropertyDecorator;
}
