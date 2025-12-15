import type { LitElement } from 'lit';
import { addInitializer } from '../../shared/add-initializer.util';
import { ensureSlotController } from '../slots';

/**
 * A property decorator that automatically updates the decorated property with the combined
 * text content of all nodes within a specified `<slot>`. This is useful for capturing
 * and reacting to the text content passed into your component.
 *
 * Whenever the content of the observed slot changes, the decorator will update the
 * property with the new text content and trigger a component update.
 *
 * @example
 *   @customElement('my-component')
 *   export class MyComponent extends LitElement {
 *     @SlottedText()
 *     text: string;
 *
 *     render() {
 *       return html`
 *         <div>The slotted text is: ${this.text}</div>
 *         <slot></slot>
 *       `;
 *     }
 *   }
 *
 * @param slotName The name of the slot to observe. If not provided, the default (unnamed) slot is observed.
 */
export function SlottedText(slotName: string | null = null): PropertyDecorator {
  return (<ElementClass extends LitElement>(
    target: ElementClass,
    decoratedPropertyName: keyof ElementClass,
  ): void => {
    addInitializer(target, (instance) => {
      const slotController = ensureSlotController(instance);
      slotController.subscribe(slotName, (nodes) => {
        const oldValue = (instance as any)[decoratedPropertyName] as string;
        const newValue = nodes
          .map((node) => node.textContent)
          .join('') as string;
        (instance as any)[decoratedPropertyName] = newValue;
        instance.requestUpdate(decoratedPropertyName, oldValue);
      });
    });
  }) as PropertyDecorator;
}
