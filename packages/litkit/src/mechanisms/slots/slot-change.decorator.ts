import { LitElement, ReactiveElement } from 'lit';
import { addInitializer } from '../../shared/add-initializer.util'
import { SlotChangeListener, SlotChangeController } from './slot-change.controller'
import type { SlotUpdateHandler } from './types'

export function SlotChange(
  slotName: string | null = null,
): MethodDecorator {
  return function <ElementClass extends LitElement>(
    target: ElementClass,
    decoratedFnName: keyof ElementClass
  ): void {
    addInitializer(target, (instance: ReactiveElement) => {
      const listener = ((instance as any)[SlotChangeListener] ??= new SlotChangeController(instance as LitElement)) as SlotChangeController
      const eventHandlerMethod = (target as any)[decoratedFnName] as SlotUpdateHandler;
      listener.subscribe(slotName, eventHandlerMethod)
    });
  } as MethodDecorator;
}
