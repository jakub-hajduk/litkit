import type { ElementConstructor } from './types';

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
