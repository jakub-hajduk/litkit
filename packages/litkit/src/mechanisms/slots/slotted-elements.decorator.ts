import { SlottedNodes } from '../slots'

export function SlottedElements(
  slotName: string | null = null
): PropertyDecorator {
  return SlottedNodes(slotName, (node) => node.nodeType === Node.ELEMENT_NODE)
}
