import type { Initializer, LitElement, ReactiveElement } from 'lit'
import type { Constructor } from './types';

export function addInitializer<T extends LitElement>(target: T | Constructor<T>, initializer: Initializer): void {
  let constructor = target.constructor as typeof ReactiveElement;

  if (typeof target === 'function') {
    constructor = target as unknown as typeof ReactiveElement
  }

  constructor.addInitializer(initializer)
}
