import { LitElement } from 'lit'
import { HostListener, HostListenerController, UpdateController, HostUpdate, attachInternals, Internals } from 'litkit'

export class BaseComponent extends LitElement {
  static shadowRootOptions = {mode: 'closed' as ShadowRootMode };

  [Internals] = attachInternals(this);
  [HostListener] = new HostListenerController(this);
  [HostUpdate] = new UpdateController(this);
}

export type BaseComponentConstructor = new (...args: any[]) => BaseComponent;
