import type {
  LitElement,
  ReactiveController,
  ReactiveControllerHost,
  ReactiveElement,
} from 'lit';
import { type DetachableEventReturn, detachableEvent } from '../event-listener';
import type { SlotUpdateHandler } from './types';

/**
 * A unique symbol used to store the `SlotChangeController` instance on a host element,
 * preventing property name collisions.
 */
export const SlotChangeListener: unique symbol = Symbol('SlotChangeListener');

/**
 * A reactive controller that monitors `<slot>` elements within a component's shadow DOM
 * and allows you to subscribe to `slotchange` events. It serves as the underlying
 * mechanism for all slot-related decorators like `@SlotChange`, `@SlottedNodes`, etc.
 *
 * While you can use this controller directly for complex scenarios, it's often more
 * convenient to use the decorators that are built upon it.
 *
 * @example
 *   @customElement('my-component')
 *   export class MyComponent extends LitElement {
 *     private slotCtrl = new SlotChangeController(this);
 *
 *     constructor() {
 *       super();
 *       // Subscribe to changes in the default slot
 *       this.slotCtrl.subscribe(null, (nodes, slot) => {
 *         console.log('Default slot changed!', { nodes, slot });
 *       });
 *     }
 *
 *     render() {
 *       return html`<slot></slot>`;
 *     }
 *   }
 */
export class SlotChangeController implements ReactiveController {
  host: LitElement & ReactiveControllerHost;
  private slots: Map<string | null, HTMLSlotElement> = new Map<
    string,
    HTMLSlotElement
  >();
  private slotNodes: Map<string | null, Node[]> = new Map();
  private updateEventListeners: Map<string | null, DetachableEventReturn> =
    new Map();
  private subscriptions: Map<string | null, SlotUpdateHandler[]> = new Map();

  constructor(host: LitElement) {
    (this.host = host).addController(this);
  }

  /**
   * Lit lifecycle method. When the host connects, this method waits for the component
   * to finish updating, then finds all `<slot>` elements and attaches `slotchange` listeners.
   */
  hostConnected(): void {
    this.host.updateComplete.then(() => {
      const slotElements = Array.from(
        this.host.renderRoot.querySelectorAll('slot'),
      );

      for (const slot of slotElements) {
        const slotUpdate = (slotElement: HTMLSlotElement) => {
          const slotName = slot.name || null;
          const slottedNodes = slotElement
            .assignedNodes({ flatten: true })
            .filter((node) => node.nodeType !== Node.COMMENT_NODE);
          this.slotNodes.set(slotName, slottedNodes);
          const handlers = this.subscriptions.get(slotName);
          if (!handlers) return;

          for (const handler of handlers) {
            handler(slottedNodes, slotElement);
          }
        };
        slotUpdate(slot);

        this.slots.set(slot.name || null, slot);

        const event = detachableEvent(
          slot,
          'slotchange',
          (event: Event) => slotUpdate(event.target as HTMLSlotElement),
          { eventId: 'slotController:slotchange' },
        );

        this.updateEventListeners.set(slot.name || null, event);

        event.attach();
      }
    });
  }

  /**
   * Retrieves the underlying `<slot>` element for a given slot name.
   * @param slotName The name of the slot. Use `null` for the default (unnamed) slot.
   * @returns The `HTMLSlotElement` or `undefined` if not found.
   */
  getSlotElement(slotName: string | null = null): HTMLSlotElement | undefined {
    return this.slots.get(slotName);
  }

  /**
   * Retrieves the current array of nodes assigned to a specific slot.
   * @param slotName The name of the slot. Use `null` for the default (unnamed) slot.
   * @returns An array of `Node` objects, or an empty array if the slot is empty or not found.
   */
  getNodes(slotName: string | null = null): Node[] {
    return this.slotNodes.get(slotName) ?? [];
  }

  /**
   * Subscribes a handler function to be called whenever the content of a specific slot changes.
   * @param slotName The name of the slot to subscribe to. Use `null` for the default slot.
   * @param handler The function to call on change. It receives the new nodes and the slot element.
   */
  subscribe(slotName: string | null = null, handler: SlotUpdateHandler): void {
    const handlers = this.subscriptions.get(slotName) ?? [];
    this.subscriptions.set(slotName, [...handlers, handler]);
  }

  /**
   * Lit lifecycle method. When the host disconnects, this method cleans up all active
   * `slotchange` event listeners to prevent memory leaks.
   */
  hostDisconnected(): void {
    for (const event of this.updateEventListeners.values()) {
      event.detach();
    }
  }
}

/**
 * A utility function that ensures a `SlotChangeController` instance exists for a given
 * component instance. If an instance already exists, it returns it; otherwise, it creates
 * a new one and attaches it to the host.
 *
 * This is used internally by decorators to get a shared controller instance for a component.
 *
 * @param instance The component instance.
 * @returns The `SlotChangeController` for the instance.
 */
export function ensureSlotController<E extends LitElement | ReactiveElement>(
  instance: E,
): SlotChangeController {
  return ((instance as any)[SlotChangeListener] ??= new SlotChangeController(
    instance as LitElement,
  ));
}
