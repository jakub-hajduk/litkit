import type { LitElement } from 'lit';
import { Listen } from './listen.decorator';
import { ListenKeys } from './listen-keys.decorator';

/**
 * A decorator that listens for click, touchend, and keydown events on the decorated element.
 * When any of these events occur, the decorated method is invoked.
 *
 * @example
 *   @customElement('l-component')
 *   export class Component extends LitElement {
 *     @Action()
 *     public click(): void {
 *       console.log('Clicked!');
 *     }
 *   }
 */
export function Action(): MethodDecorator {
  return (<ElementClass extends LitElement>(
    target: ElementClass,
    decoratedFnName: keyof ElementClass,
    descriptor: TypedPropertyDescriptor<any>,
  ): void => {
    Listen('click', { eventId: 'actionDecorator:click' })(
      target,
      decoratedFnName as string,
      descriptor,
    );
    Listen('touchend', { eventId: 'actionDecorator:touchend' })(
      target,
      decoratedFnName as string,
      descriptor,
    );
    ListenKeys('keydown', ['Space', 'Enter'], {
      eventId: 'actionDecorator:keydown',
    })(target, decoratedFnName as string, descriptor);
  }) as MethodDecorator;
}
