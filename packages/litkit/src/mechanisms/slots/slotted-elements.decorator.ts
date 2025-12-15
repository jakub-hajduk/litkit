import { SlottedNodes } from '../slots';

/**
 * A property decorator that provides a list of all `Element` nodes within a specified `<slot>`.
 * This is a convenient shorthand for `@SlottedNodes`, pre-configured to filter for element nodes.
 *
 * Use this decorator when you need to access the HTML elements passed into a slot, for example,
 * to count them, inspect their properties, or attach event listeners.
 *
 * @example
 *   @customElement('my-list')
 *   export class MyList extends LitElement {
 *     @SlottedElements()
 *     listItems: Element[];
 *
 *     render() {
 *       return html`
 *         <p>There are ${this.listItems?.length} items in the list.</p>
 *         <slot></slot>
 *       `;
 *     }
 *   }
 *
 * @param slotName The name of the slot to observe. If not provided, the default (unnamed) slot is observed.
 */
export function SlottedElements(
  slotName: string | null = null,
): PropertyDecorator {
  return SlottedNodes(slotName, (node) => node.nodeType === Node.ELEMENT_NODE);
}
