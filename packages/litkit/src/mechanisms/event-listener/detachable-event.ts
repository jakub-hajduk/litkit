import type { DetachableEventReturn, ListenOptions } from './types'

export function detachableEvent(
  element: HTMLElement,
  name: string,
  handler: EventListenerOrEventListenerObject = () => {},
  options: ListenOptions = {}
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
