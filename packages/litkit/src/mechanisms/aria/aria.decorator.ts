import { LitElement, ReactiveElement } from 'lit';
import type { AriaProperty } from './types';
import { UpdateController, HostUpdate } from '../update/update.controller';
import { attachInternals, Internals } from '../internals/internals';

type ConverterFn = (newValue: any, oldValue: any) => any;

export function Aria(
  ariaProperty: AriaProperty,
  converter?: ConverterFn
): PropertyDecorator {
  return function <ElementClass extends LitElement>(
    target: ElementClass,
    decoratedProp: keyof ElementClass
  ) {
    const constructor = target.constructor as typeof ReactiveElement;

    constructor.addInitializer(
      (
        instance: ReactiveElement & {
          [HostUpdate]?: UpdateController;
          [Internals]?: ElementInternals;
        }
      ) => {
        const internals = (instance[Internals] ??=
          attachInternals(instance));
        const update = (instance[HostUpdate] ??= new UpdateController(
          instance
        ));

        update.watch(decoratedProp, (newValue, oldValue) => {
          internals[ariaProperty] = converter
            ? converter(newValue, oldValue)
            : String(newValue);
        });
      }
    );
  } as PropertyDecorator;
}
