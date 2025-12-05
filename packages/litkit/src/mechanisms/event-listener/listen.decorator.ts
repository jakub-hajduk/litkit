import { LitElement, ReactiveElement } from 'lit'
import { addInitializer } from '../../shared/add-initializer.util'
import { ensureHostEventListener, HostEventListener } from './event-listener.controller'
import type { EventName, ListenOptions } from './types'

export function Listen(
  eventName: EventName,
  options?: ListenOptions
): MethodDecorator {
  return function <ElementClass extends LitElement>(
    target: ElementClass,
    decoratedFnName: keyof ElementClass
  ): void {
    addInitializer(target, (instance: ReactiveElement) => {
      const listener = ensureHostEventListener(instance)

      const eventHandlerMethod = target[decoratedFnName] as EventListener;

      listener.registerListener(
        eventName,
        eventHandlerMethod,
        options
      );
    });
  } as MethodDecorator;
}
