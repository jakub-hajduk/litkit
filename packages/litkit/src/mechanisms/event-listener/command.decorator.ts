import { LitElement, ReactiveElement } from 'lit'
import { addInitializer } from '../../shared/add-initializer.util'
import { ensureHostEventListener } from './event-listener.controller'

export function Command(
  commandName: string,
): MethodDecorator {
  return function <ElementClass extends LitElement>(
    target: ElementClass,
    decoratedFnName: keyof ElementClass
  ): void {
    addInitializer(target, (instance: ReactiveElement) => {
      const listener = ensureHostEventListener(instance)
      const originalMethod = target[decoratedFnName] as EventListener;

        // @ts-ignore
      const decoratedMethod = (event: CommandEvent) => {
          if (event.command === `--${commandName}`) {
            return originalMethod.call(instance, event);
          }
        };

        listener.registerListener(
          'command',
          decoratedMethod as EventListener,
        );
      }
    );
  } as MethodDecorator;
}
