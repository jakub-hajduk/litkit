import type { ElementConstructor } from './types';

/**
 * Finds the first direct child that matches the provided element constructor.
 * This gives you a typed instance match instead of a selector-based query.
 *
 * @example
 * const firstButton = firstOfType(toolbar, HTMLButtonElement);
 */
export function firstOfType<T extends ElementConstructor>(
  element: HTMLElement,
  ctor: T,
): InstanceType<T> | null {
  for (const child of Array.from(element.children)) {
    if (child instanceof ctor) {
      return child as InstanceType<T>;
    }
  }
  return null;
}
