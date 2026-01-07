import type { RovingTabindexStrategy } from './types';

/**
 * A roving tabindex strategy that enables vertical navigation through a list of elements
 * using the `ArrowUp` and `ArrowDown` keys. It also supports jumping to the first and
 * last elements with the `Home` and `End` keys, respectively.
 *
 * This strategy is designed to be used with the `RovingTabindexController` to manage focus
 * in a list-like component.
 */
export class LeftRightFocusStrategy<T extends HTMLElement>
  implements RovingTabindexStrategy<T>
{
  /**
   * Handles the `keydown` event to determine the next element to focus.
   *
   * - `ArrowUp`: Moves focus to the previous element in the list. If the current element is the first, it wraps to the last.
   * - `ArrowDown`: Moves focus to the next element in the list. If the current element is the last, it wraps to the first.
   * - `Home`: Moves focus to the first element in the list.
   * - `End`: Moves focus to the last element in the list.
   *
   * @param event The `KeyboardEvent` that triggered the focus change.
   * @param currentElement The currently focused element.
   * @param elements An array of all elements in the roving tabindex group.
   * @returns The next element to receive focus, or `undefined` if no change is needed.
   */
  keydown(
    event: KeyboardEvent,
    currentElement: T | null,
    elements: T[],
  ): T | undefined {
    if (currentElement && event.key === 'ArrowLeft')
      return elements[elements.indexOf(currentElement) - 1] || elements.at(0);
    if (currentElement && event.key === 'ArrowRight')
      return elements[elements.indexOf(currentElement) + 1] || elements.at(-1);
    if (event.key === 'Home') return elements.at(0);
    if (event.key === 'End') return elements.at(-1);
  }
}
