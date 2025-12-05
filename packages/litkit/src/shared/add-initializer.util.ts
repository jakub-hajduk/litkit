import type { Initializer, LitElement, ReactiveElement } from 'lit'

export function addInitializer<T extends LitElement>(target: T, initializer: Initializer): void {
  const constructor = target.constructor as typeof ReactiveElement;
  constructor.addInitializer(initializer)
}
