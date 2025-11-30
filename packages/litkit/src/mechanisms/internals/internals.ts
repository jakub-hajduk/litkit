export const Internals: unique symbol = Symbol('Internals');

export function attachInternals(element: HTMLElement): ElementInternals {
  return element[Internals] ??= element.attachInternals()
}
