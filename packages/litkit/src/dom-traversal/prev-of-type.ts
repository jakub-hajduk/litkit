import type { ElementConstructor } from './types';

/**
 * Finds the previous sibling that matches the provided element constructor.
 * This is a type-safe alternative to selector-based backward traversal.
 *
 * @example
 * const previousItem = prevOfType(activeItem, HTMLLIElement);
 */
export function prevOfType<T extends ElementConstructor>(
  element: HTMLElement,
  ctor: T,
): InstanceType<T> | null {
  let prev = element.previousElementSibling;
  while (prev) {
    if (prev instanceof ctor) {
      return prev as InstanceType<T>;
    }
    prev = prev.previousElementSibling;
  }
  return null;
}
