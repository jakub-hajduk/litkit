import { LitElement, type ReactiveElement } from 'lit'
import { attachInternals, Internals } from '../internals'
import { HostListener, HostListenerController } from '../listen'
import { HostUpdate, UpdateController } from '../update'

export interface BaseElementInterface {
  [Internals]: ElementInternals
  [HostListener]: HostListenerController
  [HostUpdate]: UpdateController
}

export type BaseComponentConstructor = new (...args: any[]) => LitElement & BaseElementInterface;


export function initializeBase(instance: ReactiveElement | LitElement) {
  (instance as any)[Internals] ??= attachInternals(instance);
  (instance as any)[HostUpdate] ??= new UpdateController(instance);
  (instance as any)[HostListener] ??= new HostListenerController(instance);

  return instance as LitElement & BaseElementInterface;
}
