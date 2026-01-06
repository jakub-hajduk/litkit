import type { ElementConstructor } from './types';

export function firstOfType<T extends ElementConstructor>(
  element: HTMLElement,
  constructor: T
): InstanceType<T> | null {
  for (const child of Array.from(element.children)) {
    if (child instanceof constructor) {
      return child as InstanceType<T>;
    }
  }
  return null;
}
