import type { LitElement, ReactiveControllerHost } from 'lit';

/**
 * A type alias representing either a standard `HTMLElement` or a `LitElement`.
 * This is used to indicate that a function or class can work with both.
 */
export type HTMLElementOrComponent = LitElement | HTMLElement;

/**
 * Defines the configuration options for a focusable list controller.
 * This interface provides detailed settings for managing focus navigation within a list of elements.
 * @template T The type of HTML element within the list.
 */
export interface FocusableListControllerOptions<T extends HTMLElement> {
  /**
   * A function that returns an array of elements that the roving tabindex will manage.
   * If not provided, the controller will default to using the assigned elements of the default slot.
   * @default A function that returns elements from the default slot.
   */
  getElements: () => T[];
  /**
   * An array of keyboard event codes that trigger focus movement to the previous item.
   * @default ['ArrowUp']
   */
  prevKeys: string[];
  /**
   * An array of keyboard event codes that trigger focus movement to the next item.
   * @default ['ArrowDown']
   */
  nextKeys: string[];
  /**
   * When `true`, allows users to jump to an item by typing the first few characters of its name.
   * @default false
   */
  typeFocus: boolean;
  /**
   * A function that returns the string value to be used for type-to-focus matching.
   * By default, it uses the element's `innerText`. Be aware that `innerText` can have performance
   * implications and may not always be available depending on the element's state.
   * @default (element) => element.innerText
   */
  typeFocusValue: (el: T) => string;
}

/**
 * A type alias that combines Lit's `ReactiveControllerHost` and `LitElement` types.
 * This ensures that the host component has the full LitElement API available.
 */
export type Host = ReactiveControllerHost & LitElement;

/**
 * A generic function type for a predicate used to find a specific element within a collection.
 * It receives an element, its index, and the entire collection, and should return `true` if the element matches the condition.
 * @template T The type of HTML element being evaluated.
 */
export type FocusByPredicate<T extends HTMLElement = HTMLElement> = <
  E extends T,
>(
  element: E,
  index?: number,
  collection?: E[],
) => boolean;

/**
 * Defines the interface for a roving tabindex navigation strategy. A strategy is an object
 * that determines which element should be focused next based on a keyboard event.
 * This allows the navigation logic (e.g., up/down arrows, left/right arrows, custom keys) to be pluggable.
 * @template T The type of HTML element the strategy operates on.
 */
export interface RovingTabindexStrategy<T extends HTMLElement> {
  /**
   * An optional method called when the controller is mounted, allowing the strategy to perform initial setup.
   * @param host The host component.
   */
  mount?(host: Host): void;
  /**
   * The core method of the strategy. It is called on a `keydown` event and should return
   * the next element to receive focus.
   * @param event The `KeyboardEvent` that occurred.
   * @param currentElement The element that currently has focus.
   * @param elements The full list of managed elements.
   * @returns The element that should receive focus next, or `undefined` if no focus change should occur.
   */
  keydown(
    event: KeyboardEvent,
    currentElement: T | null,
    elements: T[],
  ): T | undefined;
  /**
   * An optional method called when the controller is unmounted, allowing the strategy to perform cleanup.
   */
  unmount?(): void;
}

/**
 * Defines the configuration options for the `RovingTabindexController`.
 * @template T The type of HTML element being managed.
 */
export interface RovingTabindexControllerOptions<T extends HTMLElement> {
  /**
   * A function that returns the array of elements to be managed by the controller.
   * It receives the host element as an argument.
   */
  getElements: <E extends HTMLElement>(element: E) => T[];
  /**
   * The navigation strategy to be used by the controller. This determines how keyboard
   * events are translated into focus movements.
   */
  strategy: RovingTabindexStrategy<T>;
}
