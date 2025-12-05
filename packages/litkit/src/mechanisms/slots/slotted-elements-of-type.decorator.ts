import type { Constructor } from '../../shared/types'
import { SlottedNodes } from '../slots'

export function SlottedElementsOfType(
  slotName: string | null = null,
  types: Constructor<any>[]
): PropertyDecorator {
  return SlottedNodes(slotName, (node) => types.some(type => node instanceof type))
}
