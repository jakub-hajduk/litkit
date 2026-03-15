import type { ElementConstructor } from './types';

/**
 * Walks up the parent chain and returns the nearest ancestor that matches the provided element constructor.
 * Use this when you want stable, type-safe ancestor lookup without selector strings.
 *
 * @example
 * const form = closestOfType(button, HTMLFormElement);
 */
export function closestOfType<T extends ElementConstructor>(
  element: Element,
  ctor: T,
): InstanceType<T> | null {
  let current: Element | null = element.parentElement;
  while (current) {
    if (current instanceof ctor) {
      return current as InstanceType<T>;
    }
    current = current.parentElement;
  }
  return null;
}
