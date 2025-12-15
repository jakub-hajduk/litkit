import type { LitElement } from 'lit';
import { addInitializer } from '../../shared/add-initializer.util';
import { ensureSlotController } from '../slots';

/**
 * A property decorator that automatically updates the decorated property with an array of
 * nodes from a specified `<slot>`. This is useful for accessing and manipulating the raw
 * nodes passed into your component's slots.
 *
 * Whenever the content of the observed slot changes, the decorator will update the
 * property with the new array of nodes and trigger a component update. An optional
 * filter function can be provided to select specific nodes.
 *
 * @example
 *   @customElement('my-component')
 *   export class MyComponent extends LitElement {
 *     @SlottedNodes()
 *     nodes: Node[];
 *
 *     // Example with a filter to get only comment nodes
 *     @SlottedNodes(null, (node) => node.nodeType === Node.COMMENT_NODE)
 *     commentNodes: Node[];
 *
 *     render() {
 *       return html`
 *         <div>There are ${this.nodes?.length} nodes in the default slot.</div>
 *         <slot></slot>
 *       `;
 *     }
 *   }
 *
 * @param slotName The name of the slot to observe. If not provided, the default (unnamed) slot is observed.
 * @param filterFn An optional function to filter the nodes. It receives a `Node` and should return `true` to include it.
 */
export function SlottedNodes(
  slotName: string | null = null,
  filterFn?: (node: Node) => boolean,
): PropertyDecorator {
  return (<ElementClass extends LitElement>(
    target: ElementClass,
    decoratedFnName: keyof ElementClass,
  ): void => {
    addInitializer(target, (instance) => {
      const slotController = ensureSlotController(instance);
      slotController.subscribe(slotName, (nodes) => {
        const oldValue = (instance as any)[decoratedFnName] as Node[];
        const newValue = filterFn ? nodes.filter(filterFn) : nodes;
        (instance as any)[decoratedFnName] = newValue;
        instance.requestUpdate(decoratedFnName, oldValue);
      });
    });
  }) as PropertyDecorator;
}
