import type { ElementConstructor } from './types';

/**
 * Finds the last direct child that matches the provided element constructor.
 * This is useful when order matters and you want a typed element result.
 *
 * @example
 * const lastOption = lastOfType(select, HTMLOptionElement);
 */
export function lastOfType<T extends ElementConstructor>(
  element: HTMLElement,
  ctor: T
): InstanceType<T> | null {
  for (let i = element.children.length - 1; i >= 0; i--) {
    const child = element.children[i];
    if (child instanceof ctor) {
      return child as InstanceType<T>;
    }
  }
  return null;
}
