import { LitElement, ReactiveElement } from 'lit';
import { SlotChangeListener, SlotController } from './slot.controller'
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
      const listener = ((instance as any)[SlotChangeListener] ??= new SlotController(instance as LitElement)) as SlotController
      const eventHandlerMethod = (target as any)[decoratedFnName] as SlotUpdateHandler;
      listener.subscribe(slotName, eventHandlerMethod)
    });
  } as MethodDecorator;
}
