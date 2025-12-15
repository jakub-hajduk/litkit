import type { LitElement, ReactiveElement } from 'lit';
import { addInitializer } from '../../shared/add-initializer.util';
import { ensureHostEventListener } from './event-listener.controller';
import type { EventName, ListenOptions } from './types';

/**
 * A method decorator that registers the decorated method as a DOM event listener.
 * It attaches to the component's host or an `options`-specified target.
 * The `HostEventListener` controller automatically manages its lifecycle,
 * attaching on mount and detaching on unmount to prevent memory leaks.
 *
 * @example
 *   @customElement('l-component')
 *   export class Component extends LitElement {
 *     @Listen('selected')
 *     public handleSelected(): void {
 *       console.log('do something when item is selected');
 *     }
 *   }
 *
 * @example
 *   @customElement('l-component')
 *   export class Component extends LitElement {
 *     @Listen('click', {element: document, eventId: 'l-component-event'})
 *     private handleDocumentClick(): void {
 *       console.log('The document has beeb clicked');
 *       console.log('Also, this event will be removed when the component is unmounted');
 *     }
 *   }
 *
 * @example
 *   @customElement('l-component')
 *   export class Component extends LitElement {
 *     @Listen('selected', { capture: true, once: true })
 *     public handleSelected(): void {
 *       console.log('This event will stop listening after first catch, since { once: true } is set.');
 *     }
 *   }
 */
export function Listen(
  eventName: EventName,
  options?: ListenOptions,
): MethodDecorator {
  return (<ElementClass extends LitElement>(
    target: ElementClass,
    decoratedFnName: keyof ElementClass,
  ): void => {
    addInitializer(target, (instance: ReactiveElement) => {
      const listener = ensureHostEventListener(instance);

      const eventHandlerMethod = target[decoratedFnName] as EventListener;

      listener.registerListener(eventName, eventHandlerMethod, options);
    });
  }) as MethodDecorator;
}
