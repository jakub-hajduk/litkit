import { LitElement } from 'lit'
import { ListenKeys } from './listen-keys.decorator'
import { Listen } from './listen.decorator'

export function Action(): MethodDecorator {
  return function <ElementClass extends LitElement>(
    target: ElementClass,
    decoratedFnName: keyof ElementClass,
    descriptor: PropertyDescriptor
  ): void {
    Listen('click', {eventId: 'actionDecorator:click'})(target, decoratedFnName as string, descriptor);
    Listen('touchend', { eventId: 'actionDecorator:touchend' })(target, decoratedFnName as string, descriptor);
    ListenKeys('keydown', ['Space', 'Enter'], { eventId: 'actionDecorator:keydown' })(target, decoratedFnName as string, descriptor);
  } as MethodDecorator
}
