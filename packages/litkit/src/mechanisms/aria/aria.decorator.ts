import type { LitElement, ReactiveElement } from 'lit';
import { addInitializer } from '../../shared/add-initializer.util';
import { ensureInternals } from '../internals/internals';
import { ensureHostUpdateController } from '../update/host-update.controller';
import type { AriaProperty, ConverterFn } from './types';

/**
 * A property decorator that automatically reflects the value of a component property
 * to an ARIA attribute on the host element. This is useful for managing accessibility
 * attributes in a declarative way.
 *
 * This decorator leverages `ElementInternals` to manage ARIA attributes, ensuring that
 * they are applied correctly to the host element. When the decorated property's value
 * changes, the corresponding ARIA attribute is updated automatically.
 *
 * @example
 *   @customElement('my-checkbox')
 *   export class MyCheckbox extends LitElement {
 *     @property({ type: Boolean })
 *     @Aria('ariaChecked')
 *     checked = false;
 *
 *     @property({ type: String })
 *     @Aria('ariaLabel')
 *     label = 'My Checkbox';
 *
 *     render() {
 *       return html`<div @click=${() => this.checked = !this.checked}>${this.label}</div>`;
 *     }
 *   }
 *
 * @param ariaProperty The ARIA attribute to be managed. For example, 'ariaLabel', 'ariaChecked'.
 * @param converter An optional function to convert the property value to a string suitable for the ARIA attribute.
 *                  By default, the value is converted to a string.
 */
export function Aria(
  ariaProperty: AriaProperty,
  converter?: ConverterFn,
): PropertyDecorator {
  return (<ElementClass extends LitElement>(
    target: ElementClass,
    decoratedProp: keyof ElementClass,
  ) => {
    addInitializer(target, (instance: ReactiveElement) => {
      const internals = ensureInternals(instance);
      const update = ensureHostUpdateController(instance);

      update.watch(decoratedProp, (newValue, oldValue) => {
        if (!newValue) {
          // @ts-expect-error
          internals[ariaProperty] = null;
          return;
        }
        // @ts-expect-error
        internals[ariaProperty] = converter
          ? converter(newValue, oldValue)
          : String(newValue);
      });
    });
  }) as PropertyDecorator;
}
