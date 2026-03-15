import type { ElementConstructor } from './types';

/**
 * Returns siblings of the current element that match the provided constructor.
 * The current element is excluded from results, and matches are type-checked by instance.
 *
 * @example
 * const siblingCards = siblingsOfType(card, HTMLDivElement);
 */
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
