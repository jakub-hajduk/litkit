import type { ElementConstructor } from './types';

export function closestOfType<T extends ElementConstructor>(
  element: Element,
  constructor: T,
): InstanceType<T> | null {
  let current: Element | null = element.parentElement;
  while (current) {
    if (current instanceof constructor) {
      return current as InstanceType<T>;
    }
    current = current.parentElement;
  }
  return null;
}
