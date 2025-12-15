import type { LitElement, ReactiveElement } from 'lit';
import { addInitializer } from '../../shared/add-initializer.util';
import { ensureHostEventListener } from './event-listener.controller';

/**
 * Decorator that implements Invoker Commands API (https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API)
 * It listens for a command event and invokes the decorated method if the command matches the commandName.
 *
 * @example
 *   @customElement('l-componemnt')
 *   class Component extends LitElement {
 *
 *     @Command('my-command')
 *     private myCommandHandler(event: CommandEvent) {
 *       console.log('Command received and executed:', event.command);
 *     }
 *   }
 *
 *   // In html:
 *   <button command="--my-command" commandfor="receiver">Send Command</button>
 *   <l-component id="receiver"></l-component>
 *
 *
 */
export function Command(commandName: string): MethodDecorator {
  return (<ElementClass extends LitElement>(
    target: ElementClass,
    decoratedFnName: keyof ElementClass,
  ): void => {
    addInitializer(target, (instance: ReactiveElement) => {
      const listener = ensureHostEventListener(instance);
      const originalMethod = target[decoratedFnName] as EventListener;

      // @ts-expect-error
      const decoratedMethod = (event: CommandEvent) => {
        if (event.command === `--${commandName}`) {
          return originalMethod.call(instance, event);
        }
      };

      listener.registerListener('command', decoratedMethod as EventListener);
    });
  }) as MethodDecorator;
}
