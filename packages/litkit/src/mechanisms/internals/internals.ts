export const Internals: unique symbol = Symbol('Internals');

export function attachInternals(element: HTMLElement): ElementInternals {
  if (!(element[Internals] instanceof ElementInternals)) {
    return element.attachInternals();
  }

  return element[Internals]
}
