import { LitElement, ReactiveElement } from 'lit';
import { SlotChangeListener, SlotChangeController } from './slot-change.controller'
import type { SlotUpdateHandler } from './types'

export function SlotChange(
  slotName: string = 'default',
): MethodDecorator {
  return function <ElementClass extends LitElement>(
    target: ElementClass,
    decoratedFnName: keyof ElementClass
  ): void {
    const constructor = target.constructor as typeof ReactiveElement;

    constructor.addInitializer((instance: ReactiveElement) => {
      const listener = ((instance as any)[SlotChangeListener] ??= new SlotChangeController(instance as LitElement)) as SlotChangeController
      const eventHandlerMethod = (target as any)[decoratedFnName] as SlotUpdateHandler;
      listener.subscribe(slotName, eventHandlerMethod)
    });
  } as MethodDecorator;
}
