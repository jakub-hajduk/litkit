import type { ElementConstructor } from './types';

export function directChildrenOfType<T extends ElementConstructor>(
  element: HTMLElement,
  constructor: T
): InstanceType<T>[] {
  return Array.from(element.children).filter(
    (child) => child instanceof constructor
  ) as InstanceType<T>[];
}
