import { LitElement, ReactiveElement } from 'lit';
import { attachInternals, Internals } from '../internals/internals';
import { UpdateController, HostUpdate } from '../update/update.controller';
import type { ConverterFn } from './types'

type ElementInstance = ReactiveElement & {
  [Internals]?: ElementInternals;
  [HostUpdate]?: UpdateController;
}

export function State(state: string, converter?: ConverterFn): MethodDecorator {
  return function <ElementClass extends LitElement>(
    target: ElementClass,
    decoratedPropName: keyof ElementClass
  ): void {
    const constructor = target.constructor as typeof ReactiveElement;
    constructor.addInitializer((instance: ElementInstance) => {
        const internals = (instance[Internals] ??=
          attachInternals(instance));
        const update = (instance[HostUpdate] ??= new UpdateController(
          instance
        ));

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
  } as MethodDecorator;
}
