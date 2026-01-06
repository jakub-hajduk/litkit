import type { ElementConstructor } from './types';

export function nestedChildrenOfType<T extends ElementConstructor>(
  element: HTMLElement,
  constructor: T
): InstanceType<T>[] {
  return Array.from(element.getElementsByTagName('*')).filter(
    (child) => child instanceof constructor
  ) as InstanceType<T>[];
}
