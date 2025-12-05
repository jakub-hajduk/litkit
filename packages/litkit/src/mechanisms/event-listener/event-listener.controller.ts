import { type LitElement, type ReactiveController, type ReactiveControllerHost, type ReactiveElement } from 'lit'
import { HostUpdateListener, HostUpdateController } from '../update'
import { detachableEvent } from './detachable-event';
import type { DetachableEventReturn, ListenOptions } from './types'

export const EventListener: unique symbol = Symbol('HostListener');

export class EventListenerController implements ReactiveController {
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

export function ensureEventListener<E extends LitElement | ReactiveElement>(instance: E): EventListenerController {
  return ((instance as any)[HostUpdateListener] ??= new HostUpdateController(instance));
}
