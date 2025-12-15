import type { LitElement, ReactiveElement } from 'lit';
import { addInitializer } from '../../shared/add-initializer.util';
import { ensureHostEventListener } from './event-listener.controller';
import type { KeyboardEventCode, ListenOptions } from './types';

/**
 * A decorator that listens for specific keyboard events and keys on the host or a designated element.
 *
 * @example
 *   @customElement('l-component')
 *   export class Component extends LitElement {
 *     @ListenKeys('keydown', ['Escape'])
 *     private handleEscape(): void {
 *       console.log('This will happen when component is focused and Escape key is pressed');
 *     }
 *   }
 *
 * @example
 *   @customElement('l-component')
 *   export class Component extends LitElement {
 *     @ListenKeys('keyup', ['ArrowDown', 'ArrowUp'], {eventId: 'l-component-listener:ArrowUp,ArrowDown})
 *     private handleSelected(): void {
 *       console.log('Maybe traversing some items? Should Focus next or previous item?');
 *     }
 *   }
 */
export function ListenKeys(
  eventName: 'keydown' | 'keypress' | 'keyup',
  keys: KeyboardEventCode[] = [],
  options?: ListenOptions,
): MethodDecorator {
  return (<ElementClass extends LitElement>(
    target: ElementClass,
    decoratedFnName: keyof ElementClass,
  ): void => {
    addInitializer(target, (instance: ReactiveElement) => {
      const listener = ensureHostEventListener(instance);
      const originalMethod = target[decoratedFnName] as EventListener;

      const decoratedMethod = (event: KeyboardEvent) => {
        if (
          keys.length === 0 ||
          keys.includes(event.code as KeyboardEventCode)
        ) {
          return originalMethod.call(instance, event);
        }
      };

      listener.registerListener(
        eventName,
        decoratedMethod as EventListener,
        options,
      );
    });
  }) as MethodDecorator;
}
