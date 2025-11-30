import { LitElement } from 'lit'
import { HostListener, HostListenerController, UpdateController, HostUpdate, attachInternals, Internals } from 'litkit'
import { initializeBase } from 'litkit/src/mechanisms/initialize/initialize'

export class BaseComponent extends LitElement {
  static shadowRootOptions = {mode: 'closed' as ShadowRootMode };

  constructor() {
    super()
    initializeBase(this)
  }
}

export type BaseComponentConstructor = new (...args: any[]) => BaseComponent;
