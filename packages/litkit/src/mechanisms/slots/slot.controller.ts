import { type LitElement, type ReactiveController, type ReactiveControllerHost } from 'lit'
import { detachableEvent, type DetachableEventReturn } from '../listen'
import type { SlotUpdateHandler } from './types'

export const SlotChangeListener: unique symbol = Symbol('SlotChangeListener')

export class SlotController implements ReactiveController {
  host: LitElement & ReactiveControllerHost;
  private slots: Map<string, Node[]> = new Map()
  private updateEventListeners: Map<string, DetachableEventReturn> = new Map()
  private subscriptions: Map<string, SlotUpdateHandler[]> = new Map();

  constructor(host: LitElement & ReactiveControllerHost) {
    (this.host = host).addController(this);
  }

  hostConnected(): void {
    this.host.updateComplete.then(() => {
      const slotElements = Array.from(this.host.renderRoot.querySelectorAll('slot'))

      for (const slot of slotElements) {

        const slotUpdate = (event: Event) => {
          const slotTarget = event.target as HTMLSlotElement
          const slotName = slotTarget.name || 'default'
          const slottedNodes = slotTarget.assignedNodes().filter(node => node.nodeType !== Node.COMMENT_NODE)
          this.slots.set(slotName, slottedNodes)

          const handlers = this.subscriptions.get(slotName)
          if (!handlers) return;

          for (const handler of handlers) {
            handler(slottedNodes);
          }
        }

        const event = detachableEvent(slot, 'slotchange', slotUpdate, { eventId: 'slotController:slotchange' })

        this.updateEventListeners.set(slot.name || 'default', event)

        event.attach()
      }
    })
  }

  getNodes(slotName: string = 'default'): Node[] {
    return this.slots.get(slotName) ?? []
  }

  subscribe(slotName: string = 'default', handler: SlotUpdateHandler): void {
    const handlers = this.subscriptions.get(slotName) ?? []
    this.subscriptions.set(slotName, [...handlers, handler])
  }

  hostDisconnected(): void {
    for (const event of this.updateEventListeners.values()) {
      event.detach()
    }
  }
}
