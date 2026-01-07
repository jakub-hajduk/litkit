import type { ElementConstructor } from './types';

export function directChildrenOfType<T extends ElementConstructor>(
  element: HTMLElement,
  ctor: T
): InstanceType<T>[] {
  return Array.from(element.children).filter(
    (child) => child instanceof ctor
  ) as InstanceType<T>[];
}
