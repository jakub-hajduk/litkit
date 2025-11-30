import { LitElement, ReactiveElement } from 'lit';
import { initializeBase } from '../initialize/initialize'
import { attachInternals, Internals } from '../internals/internals';
import { UpdateController, HostUpdate } from '../update/update.controller';
import type { ConverterFn } from './types'

type ElementInstance = ReactiveElement & {
  [Internals]?: ElementInternals;
  [HostUpdate]?: UpdateController;
}

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
            internals.states.add(state);
          } else {
            internals.states.delete(state);
          }
        });
      }
    );
  } as PropertyDecorator;
}
