import type { ElementConstructor } from './types';

export function lastOfType<T extends ElementConstructor>(
  element: HTMLElement,
  constructor: T
): InstanceType<T> | null {
  for (let i = element.children.length - 1; i >= 0; i--) {
    const child = element.children[i];
    if (child instanceof constructor) {
      return child as InstanceType<T>;
    }
  }
  return null;
}
