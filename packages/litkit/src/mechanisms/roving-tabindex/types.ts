import type { LitElement, ReactiveControllerHost } from "lit";

export type HTMLElementOrComponent = LitElement | HTMLElement;

export interface FocusableListControllerOptions<T extends HTMLElement> {
	/**
	 * Getter function for elements that tabindex should rove around.
	 * If not provided, Controller will find all the elements inside default slot.
	 * @default - collection of elements in default slot.
	 */
	getElements: () => T[];
	/**
	 * Keys for selecting previous item.
	 * @default ['ArrowUp']
	 */
	prevKeys: string[];
	/**
	 * Keys for selecting next item
	 * @default ['ArrowDown']
	 */
	nextKeys: string[];
	/**
	 * Determines if searching items by typing is allowed
	 * @default false
	 */
	typeFocus: boolean;
	/**
	 * getter function for element value to be compared when typing.
	 * By defualt element's innerText is taken
	 * However please note, that innerText is not always available!
	 * @default (element) => element.innerText
	 */
	typeFocusValue: (el: T) => string;
}



export type Host = ReactiveControllerHost & LitElement

export type FocusByPredicate<T extends HTMLElement = HTMLElement> = <E extends T>(element: E, index?: number, collection?: E[]) => boolean

export interface RovingTabindexStrategy<T extends HTMLElement> {
  mount?(host: Host): void
  keydown(event: KeyboardEvent, currentElement: T | null, elements: T[]): T | undefined
  unmount?(): void
}

export interface RTABINControllerOptions<T extends HTMLElement> {
	getElements: <E extends HTMLElement>(element: E) => T[];
	strategy: RovingTabindexStrategy<T>;
}
