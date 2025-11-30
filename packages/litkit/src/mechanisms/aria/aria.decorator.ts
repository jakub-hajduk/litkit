import { LitElement, ReactiveElement } from 'lit';
import { initializeBase } from '../initialize/initialize'
import type { AriaProperty } from './types';
import { HostUpdate } from '../update/update.controller';
import { Internals } from '../internals/internals';

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
        inst: ReactiveElement
      ) => {
        const instance = initializeBase(inst)
        const internals = instance[Internals]
        const update = instance[HostUpdate]

        update.watch(decoratedProp, (newValue, oldValue) => {
          internals[ariaProperty] = converter
            ? converter(newValue, oldValue)
            : String(newValue);
        });
      }
    );
  } as PropertyDecorator;
}
