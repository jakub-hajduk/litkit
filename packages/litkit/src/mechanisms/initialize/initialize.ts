import { LitElement } from 'lit'
import { ensureInternals, Internals } from '../internals'
import { ensureHostEventListener, HostEventListener, HostEventListenerController } from '../event-listener'
import { ensureHostUpdateController, HostUpdateController, HostUpdateListener } from '../update'

export interface BaseElementInterface {
  [Internals]: ElementInternals
  [HostEventListener]: HostEventListenerController
  [HostUpdateListener]: HostUpdateController
}

export type BaseComponentConstructor = new (...args: any[]) => LitElement & BaseElementInterface;

export function initializeBase(instance: LitElement) {
  (instance as any)[Internals] ??= ensureInternals(instance);
  (instance as any)[HostUpdateListener] ??= ensureHostUpdateController(instance);
  (instance as any)[HostEventListener] ??= ensureHostEventListener(instance);

  return instance as LitElement & BaseElementInterface;
}
