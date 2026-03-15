import type { ElementConstructor } from './types';

/**
 * Returns direct child elements that are instances of the provided constructor.
 * This avoids selector-based filtering and keeps results aligned with runtime element types.
 *
 * @example
 * const inputs = directChildrenOfType(container, HTMLInputElement);
 */
export function directChildrenOfType<T extends ElementConstructor>(
  element: HTMLElement,
  ctor: T,
): InstanceType<T>[] {
  return Array.from(element.children).filter(
    (child) => child instanceof ctor,
  ) as InstanceType<T>[];
}
