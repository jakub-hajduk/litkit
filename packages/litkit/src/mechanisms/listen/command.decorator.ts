import { LitElement, ReactiveElement } from 'lit';
import { initializeBase } from '../initialize/initialize'
import { EventListener } from './event-listener.controller';

export function Command(
  commandName: string,
): MethodDecorator {
  return function <ElementClass extends LitElement>(
    target: ElementClass,
    decoratedFnName: keyof ElementClass
  ): void {
    if (typeof commandName !== 'string')
      throw new Error('Expected string value for event definition!');

    const constructor = target.constructor as typeof ReactiveElement;

    constructor.addInitializer((instance: ReactiveElement) => {
        const listener = initializeBase(instance)[EventListener]
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
