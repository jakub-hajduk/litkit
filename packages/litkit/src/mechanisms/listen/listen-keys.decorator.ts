import { LitElement, ReactiveElement } from 'lit';
import { initializeBase } from '../initialize/initialize'
import { EventListener } from './event-listener.controller';
import type { KeyboardEventCode, ListenOptions } from './types'

export function ListenKeys(
  eventName: 'keydown' | 'keypress' | 'keyup',
  keys: KeyboardEventCode[] = [],
  options?: ListenOptions
): MethodDecorator {
  return function <ElementClass extends LitElement>(
    target: ElementClass,
    decoratedFnName: keyof ElementClass
  ): void {
    if (typeof eventName !== 'string')
      throw new Error('Expected string value for event definition!');

    const constructor = target.constructor as typeof ReactiveElement;

    constructor.addInitializer((instance: ReactiveElement) => {
        const listener = initializeBase(instance)[EventListener]
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
          options
        );
      }
    );
  } as MethodDecorator;
}
