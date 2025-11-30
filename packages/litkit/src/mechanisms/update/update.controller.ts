import { type ReactiveController, type ReactiveControllerHost } from 'lit';
import type { Handler } from './types'

export const HostUpdate: unique symbol = Symbol('Update');

export class UpdateController implements ReactiveController {
  host: ReactiveControllerHost;
  handlers: Record<PropertyKey, Handler<any>[]> = {};

  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
  }

  watch<T extends any>(property: PropertyKey, handler: Handler<T>): void {
    (this.handlers[property] ??= []).push(handler);
  }

  hostUpdate(): void {
    // @ts-expect-error - We're touching Lit's internals
    for (const [property, oldValue] of this.host._$changedProperties) {
      // @ts-expect-error - We need to get to the property.
      const newValue = this.host[property];

      if (!this.handlers[property]) continue;

      for (const handler of this.handlers[property]) {
        handler(newValue, oldValue);
      }
    }
  }
}
