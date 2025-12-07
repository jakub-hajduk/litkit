import { LitElement } from 'lit'
import { addInitializer } from '../../shared/add-initializer.util'
import { ensureSlotController } from '../slots'

export function SlottedNodes(
  slotName: string | null = null,
  filterFn?: (node: Node) => boolean
): PropertyDecorator {
  return function <ElementClass extends LitElement>(
    target: ElementClass,
    decoratedFnName: keyof ElementClass
  ): void {
    addInitializer(target, (instance) => {
      const slotController = ensureSlotController(instance)
      slotController.subscribe(slotName, (nodes) => {
        const oldValue = (instance as any)[decoratedFnName] as Node[];
        const newValue = filterFn ? nodes.filter(filterFn) : nodes;
        (instance as any)[decoratedFnName] = newValue
        instance.requestUpdate(decoratedFnName, oldValue)
      })
    })
  } as PropertyDecorator;
}
