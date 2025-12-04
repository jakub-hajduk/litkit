import { LitElement } from 'lit';
import { state } from 'lit/decorators.js'
import { SlotChangeListener, SlotController } from '../slots'

export function SelectableOptions(
  slotName?: string,
): PropertyDecorator {
  return function <ElementClass extends LitElement>(
    target: ElementClass,
    decoratedFnName: keyof ElementClass
  ): void {
    state()(target, decoratedFnName)
    Object.defineProperty(target, decoratedFnName, {
      enumerable: true,
      configurable: false,
      set: () => {},
      get: function (this: LitElement) {
        const slotController = ((this as any)[SlotChangeListener] ??= new SlotController(this)) as SlotController
        const nodes = slotController.getNodes(slotName)
        return nodes.filter( node => node.nodeType === Node.ELEMENT_NODE && 'value' in node && 'selected' in node ) as (LitElement)[]
      }
    })
  } as PropertyDecorator;
}
