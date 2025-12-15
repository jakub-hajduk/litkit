import type { Constructor } from '../../shared/types';
import { SlottedNodes } from '../slots';

/**
 * A property decorator that provides a list of all slotted elements that are instances of
 * a specified type (or types). This is useful for strongly-typed access to specific kinds
 * of elements within a `<slot>`.
 *
 * This decorator builds on `@SlottedNodes` by filtering the nodes to include only those
 * that are instances of the provided class(es).
 *
 * @example
 *   @customElement('my-container')
 *   export class MyContainer extends LitElement {
 *     @SlottedElementsOfType(null, [MyItem])
 *     items: MyItem[];
 *
 *     render() {
 *       return html`
 *         <p>There are ${this.items?.length} MyItem elements in this container.</p>
 *         <slot></slot>
 *       `;
 *     }
 *   }
 *
 * @param slotName The name of the slot to observe. If not provided, the default (unnamed) slot is observed.
 * @param types An array of constructor functions (classes) to filter by. An element is included if it's an instance of any of these types.
 */
export function SlottedElementsOfType(
  slotName: string | null = null,
  types: Constructor<any>[],
): PropertyDecorator {
  return SlottedNodes(slotName, (node) =>
    types.some((type) => node instanceof type),
  );
}
