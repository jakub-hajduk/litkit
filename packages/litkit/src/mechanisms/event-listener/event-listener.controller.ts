import type {
  LitElement,
  ReactiveController,
  ReactiveControllerHost,
  ReactiveElement,
} from 'lit';
import { detachableEvent } from './detachable-event';
import type { DetachableEventReturn, ListenOptions } from './types';

export const HostEventListener: unique symbol = Symbol('HostListener');

/**
 * A reactive controller that listens for specific keyboard events and keys on the host or a designated element.
 */
export class HostEventListenerController implements ReactiveController {
  host: ReactiveControllerHost & HTMLElement;

  private events: DetachableEventReturn[] = [];

  get boundEvents(): DetachableEventReturn[] {
    return this.events;
  }

  constructor(host: ReactiveControllerHost & HTMLElement) {
    (this.host = host).addController(this);
  }

  hostConnected(): void {
    for (const event of this.events) {
      event.attach();
    }
  }

  hostDisconnected(): void {
    for (const event of this.events) {
      event.detach();
    }
  }

  /**
   * Registers a listener for a specific keyboard event and key on the host or a designated element.
   */
  public registerListener(
    eventName: string,
    method: EventListener,
    options: ListenOptions = {},
  ): DetachableEventReturn {
    const event = detachableEvent(
      options.element ?? this.host,
      eventName,
      method,
      options,
      // {
      //   eventId: `${this.host.constru}:${eventName}:${method.name}`,
      //  ...options
      // }
    );
    this.events.push(event);
    return event;
  }
}

export function ensureHostEventListener<E extends LitElement | ReactiveElement>(
  instance: E,
): HostEventListenerController {
  return ((instance as any)[HostEventListener] ??=
    new HostEventListenerController(instance));
}
