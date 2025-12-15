import type { LitElement, ReactiveElement } from 'lit';
import { addInitializer } from '../../shared/add-initializer.util';
import { ensureInternals } from '../internals/internals';
import { ensureHostUpdateController } from '../update/host-update.controller';
import type { ConverterFn } from './types';

/**
 * A property decorator that links a component's property to a custom element state.
 * This allows you to define custom states that can be used in CSS to style the component
 * based on its internal state.
 *
 * When the decorated property's value changes, the decorator adds or removes the specified
 * state from the element's `ElementInternals.states` set. This state can then be targeted
 * in CSS using the `:state()` pseudo-class.
 *
 * @example
 *   // In your component file:
 *   @customElement('my-element')
 *   export class MyElement extends LitElement {
 *     @property({ type: Boolean })
 *     @State('loading')
 *     isLoading = false;
 *
 *     render() {
 *       return html`...`;
 *     }
 *   }
 *
 *   // In your CSS file:
 *   my-element:state(loading) {
 *     opacity: 0.5;
 *     pointer-events: none;
 *   }
 *
 * @param state The name of the custom state to manage. This should be a valid CSS identifier.
 * @param converter An optional function to convert the property's value to a boolean.
 *                  If not provided, the value is treated as a boolean.
 */
export function CSSState(
  state: string,
  converter?: ConverterFn,
): PropertyDecorator {
  return (<ElementClass extends LitElement>(
    target: ElementClass,
    decoratedPropName: keyof ElementClass,
  ): void => {
    addInitializer(target, (instance: ReactiveElement) => {
      const internals = ensureInternals(instance);
      const update = ensureHostUpdateController(instance);

      update.watch(decoratedPropName, (value) => {
        const isState = converter ? converter(value) : Boolean(value);

        if (isState) {
          // @ts-expect-error
          internals.states.add(state);
        } else {
          // @ts-expect-error
          internals.states.delete(state);
        }
      });
    });
  }) as PropertyDecorator;
}
