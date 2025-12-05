import { LitElement, ReactiveElement } from 'lit'
import { addInitializer } from '../../shared/add-initializer.util'
import { ensureHostEventListener } from './event-listener.controller'
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
    addInitializer(target, (instance: ReactiveElement) => {
        const listener = ensureHostEventListener(instance)
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
