import { LitElement, ReactiveElement } from 'lit'
import { addInitializer } from '../../shared/add-initializer.util'
import { ensureInternals } from '../internals/internals'
import { ensureHostUpdateController } from '../update/host-update.controller'
import type { ConverterFn } from './types'

export function State(state: string, converter?: ConverterFn): PropertyDecorator {
  return function <ElementClass extends LitElement>(
    target: ElementClass,
    decoratedPropName: keyof ElementClass
  ): void {
    addInitializer(target, (instance: ReactiveElement) => {
      const internals = ensureInternals(instance)
      const update = ensureHostUpdateController(instance)

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
