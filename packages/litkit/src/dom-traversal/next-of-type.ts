import type { ElementConstructor } from './types';

/**
 * Finds the next sibling that matches the provided element constructor.
 * This performs stable sibling traversal using runtime instance checks.
 *
 * @example
 * const nextRow = nextOfType(currentRow, HTMLTableRowElement);
 */
export function nextOfType<T extends ElementConstructor>(
  element: HTMLElement,
  ctor: T
): InstanceType<T> | null {
  let next = element.nextElementSibling;
  while (next) {
    if (next instanceof ctor) {
      return next as InstanceType<T>;
    }
    next = next.nextElementSibling;
  }
  return null;
}
