import type { LitElement, ReactiveElement } from 'lit'

export const Internals: unique symbol = Symbol('Internals');

export function attachInternals(element: LitElement | ReactiveElement): ElementInternals {
  return (element as any)[Internals] ??= element.attachInternals()
}
