import type { ReactiveController } from 'lit';
import {
  type DetachableEventReturn,
  ensureHostEventListener,
  type HostEventListenerController,
} from '../event-listener';
import type { Host, RovingTabindexControllerOptions } from './types';
import { UpDownFocusStrategy } from './updown-focus.strategy';

/**
 * A reactive controller that implements the roving tabindex accessibility pattern. This pattern
 * manages focus for a group of interactive elements, ensuring that only one element at a time
 * is included in the tab order (`tabindex="0"`), while the others are removed (`tabindex="-1"`).
 *
 * This controller listens for keyboard events to navigate between the elements and can be
 * configured with different navigation strategies (e.g., up/down arrows, left/right arrows).
 *
 * @example
 *   @customElement('my-menu')
 *   export class MyMenu extends LitElement {
 *     private rovingTabindex = new RovingTabindexController(this);
 *
 *     render() {
 *       return html`
 *         <slot></slot>
 *       `;
 *     }
 *   }
 *
 *   // In your HTML:
 *   <my-menu>
 *     <button>Item 1</button>
 *     <button>Item 2</button>
 *     <button>Item 3</button>
 *   </my-menu>
 */
export class RovingTabindexController<T extends HTMLElement>
  implements ReactiveController
{
  private host: Host;
  private elements: T[] = [];
  private currentElement: T = this.elements[0];
  private attachedEvents: Map<T, DetachableEventReturn> = new Map();
  private listener: HostEventListenerController;

  private options: RovingTabindexControllerOptions<T> = {
    getElements: () => {
      const slotElement = this.host.shadowRoot?.querySelector(
        'slot:not([name])',
      ) as HTMLSlotElement;
      if (slotElement) return slotElement.assignedElements() as T[];
      return [];
    },
    getCurrentElement: () => this.currentElement,
    strategy: new UpDownFocusStrategy(),
  };

  constructor(
    host: Host,
    options?: Partial<RovingTabindexControllerOptions<T>>,
  ) {
    this.options = {
      ...this.options,
      ...options,
    } as RovingTabindexControllerOptions<T>;
    (this.host = host).addController(this);
    this.listener = ensureHostEventListener(this.host);
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  /**
   * Scans the host for focusable elements based on the `getElements` option,
   * attaches keydown listeners, and sets the initial focus.
   */
  private updateElements(): void {
    this.elements = this.options.getElements();
    if (this.elements.length === 0) return;

    for (const element of this.elements) {
      if (this.attachedEvents.has(element)) continue; // Prevent adding multiple events to the elements

      const event = this.listener.registerListener(
        'keydown',
        this.handleKeydown as EventListener,
        { element, eventId: 'RovingTabindexController:keydown (on element)' },
      );

      this.attachedEvents.set(element, event);

      event.attach();
    }

    // Clear listeners to the elements that don't exist anymore.
    for (const [element, event] of this.attachedEvents) {
      if (!this.elements.includes(element)) {
        event.detach();
        this.attachedEvents.delete(element);
      }
    }

    const currentElement = this.options.getCurrentElement();

    this.focus(currentElement);
  }

  /**
   * Handles the `keydown` event on the focusable elements, delegating to the
   * configured strategy to determine the next element to focus.
   */
  private handleKeydown(event: KeyboardEvent): void {
    const element = this.options.strategy.keydown(
      event,
      this.currentElement,
      this.elements,
    ) as T;

    if (!element) return;
    if (element === this.currentElement) return;

    this.focus(element);
  }

  /**
   * Sets focus to the specified element and updates the `tabindex` of all managed elements.
   * The focused element receives `tabindex="0"`, while all others get `tabindex="-1"`.
   *
   * @param element The element to focus. Defaults to the currently focused element.
   */
  public focus(element: T = this.currentElement as T): void {
    for (const el of this.elements) {
      if (el.hasAttribute('disabled')) continue;

      if (el === element) {
        el.tabIndex = 0;
        this.currentElement = element;
        el.focus();
      } else {
        el.tabIndex = -1;
      }
    }
  }

  /**
   * Lit lifecycle method. Called when the host connects to the DOM.
   * Initializes the controller by finding elements and setting initial focus.
   */
  async hostConnected(): Promise<void> {
    await this.host.updateComplete;
    this.updateElements();
    this.focus(this.elements[0]);
  }

  /**
   * Lit lifecycle method. Called when the host is about to update.
   * Re-scans for elements to handle dynamic changes in the DOM.
   */
  async hostUpdate(): Promise<void> {
    await this.host.updateComplete;
    this.updateElements();
  }
}
