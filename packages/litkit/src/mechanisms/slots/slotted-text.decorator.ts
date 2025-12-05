import { LitElement } from 'lit'
import { addInitializer } from '../../shared/add-initializer.util'
import { ensureSlotController } from '../slots'

export function SlottedText(
  slotName: string | null = null
): PropertyDecorator {
  return function <ElementClass extends LitElement>(
    target: ElementClass,
    decoratedPropertyName: keyof ElementClass
  ): void {
    addInitializer(target, (instance) => {
      const slotController = ensureSlotController(instance)
      slotController.subscribe(slotName, (nodes) => {
        const oldValue = (instance as any)[decoratedPropertyName] as string
        const newValue = nodes.map(node => node.textContent).join('') as string;
        (instance as any)[decoratedPropertyName] = newValue
        instance.requestUpdate(decoratedPropertyName, oldValue)
      })
    })
  } as PropertyDecorator;
}
