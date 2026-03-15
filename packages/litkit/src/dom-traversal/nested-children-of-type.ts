import type { ElementConstructor } from './types';

/**
 * Returns all descendant elements that match the provided element constructor.
 * Use it for deep traversal when you want typed matches across the full subtree.
 *
 * @example
 * const links = nestedChildrenOfType(section, HTMLAnchorElement);
 */
export function nestedChildrenOfType<T extends ElementConstructor>(
  element: HTMLElement,
  ctor: T
): InstanceType<T>[] {
  return Array.from(element.getElementsByTagName('*')).filter(
    (child) => child instanceof ctor
  ) as InstanceType<T>[];
}
