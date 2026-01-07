import type { ElementConstructor } from './types';

export function nestedChildrenOfType<T extends ElementConstructor>(
  element: HTMLElement,
  ctor: T
): InstanceType<T>[] {
  return Array.from(element.getElementsByTagName('*')).filter(
    (child) => child instanceof ctor
  ) as InstanceType<T>[];
}
