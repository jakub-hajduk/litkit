import type { LitElement, ReactiveElement } from 'lit';

export const Internals: unique symbol = Symbol('Internals');

export function ensureInternals(
  element: LitElement | ReactiveElement,
): ElementInternals {
  return ((element as any)[Internals] ??= element.attachInternals());
}
