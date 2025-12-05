import { LitElement, ReactiveElement } from 'lit';
import { initializeBase } from '../initialize/initialize'
import { EventListener, } from './event-listener.controller';
import type { EventName, ListenOptions } from './types'

export function Listen(
  eventName: EventName,
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
      const eventHandlerMethod = target[decoratedFnName] as EventListener;

      listener.registerListener(
        eventName,
        eventHandlerMethod,
        options
      );
    });
  } as MethodDecorator;
}
