import { type ReactiveController, type ReactiveControllerHost } from 'lit';
import { detachableEvent } from './detachable-event';
import type { DetachableEventReturn, ListenOptions } from './types'

export const HostListener: unique symbol = Symbol('hostListener');

export class HostListenerController implements ReactiveController {
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

  public registerListener(
    eventName: string,
    method: EventListener,
    options: ListenOptions = {}
  ): DetachableEventReturn {
    const event = detachableEvent(
      options.element ?? this.host,
      eventName,
      method,
      options
    );
    this.events.push(event);
    return event
  }
}
