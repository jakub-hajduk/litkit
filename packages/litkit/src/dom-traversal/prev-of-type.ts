import type { ElementConstructor } from './types';

export function prevOfType<T extends ElementConstructor>(
  element: HTMLElement,
  constructor: T
): InstanceType<T> | null {
  let prev = element.previousElementSibling;
  while (prev) {
    if (prev instanceof constructor) {
      return prev as InstanceType<T>;
    }
    prev = prev.previousElementSibling;
  }
  return null;
}
