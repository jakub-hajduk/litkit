import { LitElement, ReactiveElement } from 'lit'
import { addInitializer } from '../../shared/add-initializer.util'
import { ensureInternals } from '../internals/internals'
import { ensureHostUpdateController } from '../update/host-update.controller'
import type { AriaProperty, ConverterFn } from './types'

export function Aria(
  ariaProperty: AriaProperty,
  converter?: ConverterFn
): PropertyDecorator {
  return function <ElementClass extends LitElement>(
    target: ElementClass,
    decoratedProp: keyof ElementClass
  ) {
    addInitializer(target, (instance: ReactiveElement) => {
        const internals = ensureInternals(instance)
        const update = ensureHostUpdateController(instance)

        update.watch(decoratedProp, (newValue, oldValue) => {
          // @ts-ignore
          internals[ariaProperty] = converter
            ? converter(newValue, oldValue)
            : String(newValue);
        });
      }
    );
  } as PropertyDecorator;
}
