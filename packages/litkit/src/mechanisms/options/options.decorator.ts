import { SlottedNodes } from '../slots'

export function SelectableOptions(
  slotName?: string,
): PropertyDecorator {
  return SlottedNodes(slotName, node => node.nodeType === Node.ELEMENT_NODE && 'value' in node && 'selected' in node )
}
