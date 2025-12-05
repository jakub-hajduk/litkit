import { LitElement } from 'lit'
import { ensureInternals, Internals } from '../internals'
import { ensureEventListener, EventListener, EventListenerController } from '../event-listener'
import { ensureHostUpdateController, HostUpdateController, HostUpdateListener } from '../update'

export interface BaseElementInterface {
  [Internals]: ElementInternals
  [EventListener]: EventListenerController
  [HostUpdateListener]: HostUpdateController
}

export type BaseComponentConstructor = new (...args: any[]) => LitElement & BaseElementInterface;

export function initializeBase(instance: LitElement) {
  (instance as any)[Internals] ??= ensureInternals(instance);
  (instance as any)[HostUpdateListener] ??= ensureHostUpdateController(instance);
  (instance as any)[EventListener] ??= ensureEventListener(instance);

  return instance as LitElement & BaseElementInterface;
}
