import type { ElementConstructor } from './types';

export function nextOfType<T extends ElementConstructor>(
  element: HTMLElement,
  constructor: T
): InstanceType<T> | null {
  let next = element.nextElementSibling;
  while (next) {
    if (next instanceof constructor) {
      return next as InstanceType<T>;
    }
    next = next.nextElementSibling;
  }
  return null;
}
