import { type LitElement, type ReactiveController, type ReactiveControllerHost, type ReactiveElement } from 'lit'
import { detachableEvent, type DetachableEventReturn } from '../event-listener'
import type { SlotUpdateHandler } from './types'

export const SlotChangeListener: unique symbol = Symbol('SlotChangeListener')

export class SlotChangeController implements ReactiveController {
  host: LitElement & ReactiveControllerHost;
  private slots: Map<string | null, HTMLSlotElement> = new Map<string, HTMLSlotElement>()
  private slotNodes: Map<string | null, Node[]> = new Map()
  private updateEventListeners: Map<string | null, DetachableEventReturn> = new Map()
  private subscriptions: Map<string | null, SlotUpdateHandler[]> = new Map();

  constructor(host: LitElement) {
    (this.host = host).addController(this);
  }

  hostConnected(): void {
    this.host.updateComplete.then(() => {
      const slotElements = Array.from(this.host.renderRoot.querySelectorAll('slot'))

      for (const slot of slotElements) {
        const slotUpdate = (slotElement: HTMLSlotElement) => {
          const slotName = slot.name || null
          const slottedNodes = slotElement.assignedNodes({flatten: true}).filter(node => node.nodeType !== Node.COMMENT_NODE)
          this.slotNodes.set(slotName, slottedNodes)
          const handlers = this.subscriptions.get(slotName)
          if (!handlers) return;

          for (const handler of handlers) {
            handler(slottedNodes, slotElement);
          }
        }
        slotUpdate(slot)

        this.slots.set(slot.name || null, slot)

        const event = detachableEvent(slot, 'slotchange', (event: Event) => slotUpdate(event.target as HTMLSlotElement), { eventId: 'slotController:slotchange' })

        this.updateEventListeners.set(slot.name || null, event)

        event.attach()
      }
    })
  }

  getSlotElement(slotName: string | null = null): HTMLSlotElement | undefined {
    return this.slots.get(slotName)
  }

  getNodes(slotName: string | null = null): Node[] {
    return this.slotNodes.get(slotName) ?? []
  }

  subscribe(slotName: string | null = null, handler: SlotUpdateHandler): void {
    const handlers = this.subscriptions.get(slotName) ?? []
    this.subscriptions.set(slotName, [...handlers, handler])
  }

  hostDisconnected(): void {
    for (const event of this.updateEventListeners.values()) {
      event.detach()
    }
  }
}


export function ensureSlotController<E extends LitElement | ReactiveElement>(instance: E): SlotChangeController {
  return ((instance as any)[SlotChangeListener] ??= new SlotChangeController(instance as LitElement))
}
