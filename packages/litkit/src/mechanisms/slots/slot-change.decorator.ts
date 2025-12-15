import type { LitElement, ReactiveElement } from 'lit';
import { addInitializer } from '../../shared/add-initializer.util';
import {
  SlotChangeController,
  SlotChangeListener,
} from './slot-change.controller';
import type { SlotUpdateHandler } from './types';

/**
 * A method decorator that triggers the decorated method whenever the content of a specified `<slot>` changes.
 * This is useful for reacting to changes in the component's light DOM, allowing you to perform actions
 * when nodes are added or removed from a slot.
 *
 * The decorated method will be called with an object containing the `slot` element, a list of `addedNodes`,
 * and a list of `removedNodes`.
 *
 * @example
 *   @customElement('my-component')
 *   export class MyComponent extends LitElement {
 *     render() {
 *       return html`<slot></slot>`;
 *     }
 *
 *     @SlotChange()
 *     handleSlotChange({ addedNodes, removedNodes }) {
 *       console.log('Default slot changed:', { addedNodes, removedNodes });
 *     }
 *
 *     @SlotChange('named-slot')
 *     handleNamedSlotChange({ addedNodes, removedNodes }) {
 *       console.log('Named slot changed:', { addedNodes, removedNodes });
 *     }
 *   }
 *
 * @param slotName The name of the slot to observe. If not provided, the default (unnamed) slot is observed.
 */
export function SlotChange(slotName: string | null = null): MethodDecorator {
  return (<ElementClass extends LitElement>(
    target: ElementClass,
    decoratedFnName: keyof ElementClass,
  ): void => {
    addInitializer(target, (instance: ReactiveElement) => {
      const listener = ((instance as any)[SlotChangeListener] ??=
        new SlotChangeController(
          instance as LitElement,
        )) as SlotChangeController;
      const eventHandlerMethod = (target as any)[
        decoratedFnName
      ] as SlotUpdateHandler;
      listener.subscribe(slotName, eventHandlerMethod);
    });
  }) as MethodDecorator;
}
