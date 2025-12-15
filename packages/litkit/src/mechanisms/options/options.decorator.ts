import { SlottedNodes } from '../slots';

/**
 * A property decorator that provides a list of slotted elements that are considered "selectable options".
 * An element is considered a selectable option if it has `value` and `selected` properties.
 *
 * This is particularly useful for creating custom select-like components, where you need to manage a
 * collection of option elements. The decorator automatically collects these elements from a specified
 * slot and updates the decorated property when the slot's content changes.
 *
 * @example
 *   @customElement('my-option')
 *   export class MyOption extends LitElement {
 *     @property() value: string;
 *     @property({ type: Boolean }) selected = false;
 *   }
 *
 *   @customElement('my-select')
 *   export class MySelect extends LitElement {
 *     @SelectableOptions()
 *     options: MyOption[];
 *
 *     render() {
 *       return html`
 *         <p>There are ${this.options?.length} options.</p>
 *         <slot></slot>
 *       `;
 *     }
 *   }
 *
 * @param slotName The name of the slot to observe. If not provided, the default (unnamed) slot is observed.
 */
export function SelectableOptions(slotName?: string): PropertyDecorator {
  return SlottedNodes(
    slotName,
    (node) =>
      node.nodeType === Node.ELEMENT_NODE &&
      'value' in node &&
      'selected' in node,
  );
}
