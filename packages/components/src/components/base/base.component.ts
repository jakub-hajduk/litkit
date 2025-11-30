import { LitElement } from 'lit'
import { HostListener, HostListenerController, UpdateController, HostUpdate, attachInternals, Internals } from 'litkit'

export interface BaseElementInterface {
  [Internals]: ElementInternals
  [HostListener]: HostListenerController
  [HostUpdate]: UpdateController
}

export class BaseComponent extends LitElement {
  static shadowRootOptions = {mode: 'closed' as ShadowRootMode };

  [Internals] = attachInternals(this);
  [HostListener] = new HostListenerController(this);
  [HostUpdate] = new UpdateController(this);
}

export type BaseComponentConstructor = new (...args: any[]) => BaseComponent;


export function initializeBase<Base extends LitElement>(instance: Base) {
  instance[Internals] ??= attachInternals(instance);
  instance[HostUpdate] ??= new UpdateController(instance);
  instance[HostListener] ??= new HostListenerController(instance);

  return instance as Base & BaseElementInterface;
}
