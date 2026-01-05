import type { LitElement, ReactiveElement } from 'lit';
import { addInitializer } from '../../shared/add-initializer.util';
import type { ConverterFn } from '../../shared/types';
import { ensureHostUpdateController } from '../update/host-update.controller';

export function DelegateValue(
  selector: string,
  targetProperty?: PropertyKey,
  converter?: ConverterFn,
): PropertyDecorator {
  return (<ElementClass extends LitElement>(
    target: ElementClass,
    decoratedPropName: keyof ElementClass,
  ): void => {
    addInitializer(target, (instance: ReactiveElement) => {
      console.log(
        { a: instance.constructor },
        instance.constructor.elementProperties.get(decoratedPropName),
      );
      instance.updateComplete.then(() => {
        const element = instance.renderRoot.querySelector(selector);

        if (!element) return;
        const update = ensureHostUpdateController(instance);
        const finalProperty = targetProperty || decoratedPropName;

        update.watch(decoratedPropName, (value, oldValue) => {
          const finalValue = converter ? converter(value, oldValue) : value;
          (element as any)[finalProperty] = finalValue;
        });
      });
    });
  }) as PropertyDecorator;
}
