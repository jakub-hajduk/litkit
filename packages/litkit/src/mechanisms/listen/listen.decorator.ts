import { LitElement, ReactiveElement } from 'lit';
import { attachInternals, Internals } from '../internals'
import {
  HostListener,
  HostListenerController,
} from './listen.controller';
import type { EventName, ListenOptions } from './types'

type ElementInstance = ReactiveElement & {
  [HostListener]?: HostListenerController;
}

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

    constructor.addInitializer((instance: ElementInstance) => {
      const listener = (instance[HostListener] ??=
        new HostListenerController(instance));

        const eventHandlerMethod = target[decoratedFnName] as EventListener;

        listener.registerListener(
          eventName,
          eventHandlerMethod,
          options
        );
      }
    );
  } as MethodDecorator;
}
