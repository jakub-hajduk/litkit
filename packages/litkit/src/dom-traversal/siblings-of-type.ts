import type { ElementConstructor } from './types';

export function siblingsOfType<T extends ElementConstructor>(
  element: HTMLElement,
  ctor: T,
): InstanceType<T>[] {
  const parent = element.parentElement;
  if (!parent) return [];
  return Array.from(parent.children).filter(
    (child) => child !== element && child instanceof ctor,
  ) as InstanceType<T>[];
}
