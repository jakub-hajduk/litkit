import type { ElementConstructor } from './types';

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
