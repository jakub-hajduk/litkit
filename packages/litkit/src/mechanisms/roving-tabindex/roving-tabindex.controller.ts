import type { LitElement, ReactiveController, ReactiveControllerHost } from "lit";
import { ensureHostEventListener, type DetachableEventReturn, type HostEventListener, type HostEventListenerController } from "../event-listener";
import type { FocusByPredicate, Host, RTABINControllerOptions } from "./types";
import { UpDownStrategy } from "./updown-focus.strategy";

export class RovingTabindexController<T extends HTMLElement> implements ReactiveController {
  private host: Host;
  private elements: T[] = [];
  private currentElement: T = this.elements[0];
  private attachedEvents: Map<T, DetachableEventReturn> = new Map();
  private listener: HostEventListenerController;

  private options: RTABINControllerOptions<T> = {
    getElements: (host) => {
      const slotElement = host.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement;
  		if (slotElement) return slotElement.assignedElements() as T[];
  		return [];
    },
    strategy: new UpDownStrategy()
  }

  constructor(host: Host, options?: Partial<RTABINControllerOptions<T>>) {
    this.options = {
      ...this.options,
      ...options
      } as RTABINControllerOptions<T>
    (this.host = host).addController(this);
    this.listener = ensureHostEventListener(this.host);
    this.handleKeydown = this.handleKeydown.bind(this)
  }

  private updateElements(): void {
		this.elements = this.options.getElements(this.host);
		if (this.elements.length === 0) return;

		for (const element of this.elements) {
		  if (this.attachedEvents.has(element)) continue; // Prevent adding multiple events to the elements

      const event = this.listener.registerListener('keydown', this.handleKeydown as EventListener, { element, eventId: 'RovingTabindexController:keydown (on element)' })

      this.attachedEvents.set(element, event)

      event.attach()
		}

		// Clear listeners to the elements that don't exist anymore.
		for (const [element, event] of this.attachedEvents) {
			if (!this.elements.includes(element)) {
				event.detach();
				this.attachedEvents.delete(element);
			}
		}

		this.focus(this.elements[0]);
  }

  private handleKeydown(event: KeyboardEvent): void{
    const element = this.options.strategy.keydown(event, this.currentElement, this.elements) as T

    if (!element) return
    if (element === this.currentElement) return

    this.focus(element);
  }

	public focus(element: T = this.currentElement as T): void {
    for (const el of this.elements) {
      if (el.hasAttribute('disabled')) continue;

      if (el === element) {
        el.tabIndex = 0;
        this.currentElement = element
        el.focus();
      } else {
        el.tabIndex = -1;
      }
    }
	}

	async hostConnected(): Promise<void> {
		await this.host.updateComplete;
		this.updateElements();
		this.focus(this.elements[0]);
	}

	async hostUpdate(): Promise<void> {
    await this.host.updateComplete;
		this.updateElements();
	}
}
