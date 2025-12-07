import type { LitElement } from 'lit';
import type { ReactiveController, ReactiveControllerHost } from 'lit';
import { ensureHostEventListener, HostEventListenerController, type DetachableEventReturn } from '../event-listener';
import type { FocusableListControllerOptions } from './types';
import { SlotChangeController } from '../slots';


const isTyping = (event: KeyboardEvent) => event.key === 'Backspace' || event.key === 'Clear' || (event.key.length === 1 && event.key !== ' ' && !event.ctrlKey && !event.metaKey);

export const HORIZONTAL_ARROWS = {
	prevKeys: ['ArrowLeft'],
	nextKeys: ['ArrowRight'],
} as const;

export const VERTICAL_ARROWS = {
	prevKeys: ['ArrowUp'],
	nextKeys: ['ArrowDown'],
} as const;

export const BOTH_ARROWS = {
	prevKeys: ['ArrowUp', 'ArrowLeft'],
	nextKeys: ['ArrowDown', 'ArrowRight'],
} as const;

export class RovingTabindexListController<T extends HTMLElement> implements ReactiveController {
	private host: ReactiveControllerHost & LitElement;
	private elements: T[] = [];
	private currentIndex: number = 0;

	defaultGetElements = (): T[] => {
		const slotElement = this.host.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement;

		if (slotElement) {
			return slotElement.assignedElements() as T[];
		}

		return [];
	};

	options: FocusableListControllerOptions<T> = {
		getElements: this.defaultGetElements,
		typeFocus: false,
		prevKeys: ['ArrowUp'],
		nextKeys: ['ArrowDown'],
		typeFocusValue: (element) => element.innerText,
	};

	// events = new InternalEvent<'next' | 'prev' | 'first' | 'last' | 'change', number | undefined>();

	hostEventController: HostEventListenerController;
	attachedEvents: Map<T, DetachableEventReturn> = new Map<T, DetachableEventReturn>();

	private searchQuery = '';
	private searchTimeout: ReturnType<typeof setTimeout> | null = null;

	get focusedElement(): T | undefined {
		return this.elements[this.currentIndex];
	}

	constructor(host: ReactiveControllerHost & LitElement, options: Partial<FocusableListControllerOptions<T>> = {}) {
		(this.host = host).addController(this);

		this.hostEventController = ensureHostEventListener(this.host as LitElement)

		this.options = {
			...this.options,
			...options,
		};

		this.handleKeydown = this.handleKeydown.bind(this);
	}

	public updateElements(): void {
		this.elements = this.options.getElements();
		if (this.elements.length === 0) return;

		for (const element of this.elements) {
		  if (this.attachedEvents.has(element)) continue;
      const event = this.hostEventController.registerListener('keydown', this.handleKeydown as EventListener, { element, eventId: 'RovingTabindexController:keydown (on element)' })
			this.attachedEvents.set(element, event)
      event.attach()
		}

		for (const [element, event] of this.attachedEvents) {
			if (!this.elements.includes(element)) {
				event.detach();
				this.attachedEvents.delete(element);
			}
		}

		this.setCurrentIndex(this.currentIndex);
	}

	hostUpdate(): void {
		this.updateElements();
	}

	async hostConnected(): Promise<void> {
		await this.host.updateComplete;
		this.updateElements();

		const hostEvent = this.hostEventController.registerListener('keydown', this.handleKeydown as EventListener, {eventId: 'RovingTabindexController:keydown (on host)'})
		hostEvent.attach()
		this.setCurrentIndex(0);
	}

	public setCurrentIndex(index = 0): void {
		if (index < 0) return;

		if (this.elements.length > 0) {
			this.elements.forEach((element) => {
				if (!element.hasAttribute('disabled')) {
					element.tabIndex = -1;
				}
			});

			if (this.elements[index].hasAttribute('disabled') && index === 0) {
				this.elements[index + 1].tabIndex = 0;
			} else {
				this.elements[index].tabIndex = 0;
			}

			this.currentIndex = index;
		}
	}

	public focusByIndex(index: number): void {
		this.focusBy((_el, elementIndex) => elementIndex === index);
	}

	public async focusBy(predicate: (element: T, index?: number, collection?: T[]) => boolean): void {
		await this.host.updateComplete;

		let index = this.elements.findIndex(predicate);

		if (index < 0) {
			index = 0;
		}

		if (index > this.elements.length) {
			index = this.elements.length;
		}

		this.focus(index);
	}

	private async focus(index?: number) {
		await this.host.updateComplete;
		if (typeof index === 'number') this.currentIndex = index;

		this.setCurrentIndex(index);
		this.elements[index || this.currentIndex].focus();
	}

	private previous() {
		if (this.currentIndex !== 0) {
			this.focusByIndex(this.currentIndex - 1);
		} else {
			// this.events.emit('prev');
		}

		// this.events.emit('change', this.currentIndex);
	}

	private next() {
		if (this.currentIndex !== this.elements.length - 1) {
			this.focusByIndex(this.currentIndex + 1);
		} else {
			// this.events.emit('next');
		}

		// this.events.emit('change', this.currentIndex);
	}

	public first(): void {
		this.focusByIndex(0);
	}

	public last(): void {
		this.focusByIndex(this.elements.length - 1);
	}

	private type(letter?: string) {
		if (this.searchTimeout !== null) {
			clearTimeout(this.searchTimeout);
		}

		this.searchTimeout = setTimeout(() => {
			this.searchQuery = '';
		}, 500);

		this.searchQuery += letter;

		this.focusBy((element) => this.options.typeFocusValue(element).toLowerCase().startsWith(this.searchQuery.toLowerCase()));
	}

	private handleKeydown(event: KeyboardEvent): void {
		event.stopImmediatePropagation();
		if (this.options.prevKeys.includes(event.key)) this.previous();
		if (this.options.nextKeys.includes(event.key)) this.next();
		if (event.key === 'Home') this.first();
		if (event.key === 'End') this.last();
		if (this.options.typeFocus && isTyping(event)) this.type(event.key);
	}
}
