import type { RovingTabindexStrategy } from "./types";

export class UpDownStrategy<T extends HTMLElement> implements RovingTabindexStrategy<T> {
  keydown(event: KeyboardEvent, currentElement: T | null, elements: T[]): T | undefined {
		if (event.key === 'ArrowUp') return elements[elements.indexOf(currentElement!) - 1] || elements.at(0);
		if (event.key === 'ArrowDown') return elements[elements.indexOf(currentElement!) + 1] || elements.at(-1);
		if (event.key === 'Home') return elements.at(0)!;
    if (event.key === 'End') return elements.at(-1)!;
  }
}
