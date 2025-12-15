import type { DetachableEventReturn, ListenOptions } from './types';

/**
 * Internal utility function to create a detachable event listener.
 *
 * @example
 *   const event = detachableEvent(element, 'click', () => console.log('Clicked'));
 *   event.attach(); // Attaches the event listener to the element
 *   event.detach(); // Detaches the event listener from the element
 */
export function detachableEvent(
  element: HTMLElement,
  name: string,
  handler: EventListenerOrEventListenerObject = () => {},
  options: ListenOptions = {},
): DetachableEventReturn {
  return {
    id: options?.eventId,
    details: {
      name,
      handler,
      options,
    },
    attach: () => {
      element.addEventListener(name, handler, options);
    },
    detach: () => {
      element.removeEventListener(name, handler, options);
    },
  };
}
