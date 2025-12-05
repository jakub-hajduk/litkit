import type { Meta } from '@storybook/web-components-vite'
import { css, html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SlotChange, SlotChangeController } from 'litkit'

const meta: Meta = {
  title: 'Slot Controller',
}

export default meta

@customElement('test-slot-controller')
class SlotControllerCE extends LitElement {
  static styles = [css`
      :host {
        border: 1px solid #ccc;
        border-radius: 14px;
        padding: 8px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      
      hr {
          border-style: solid;
          border-color: #ccc;
          border-width: 1px 0 0;
          width: 100%;
          height: 1px;
      }
  `]

  @SlotChange()
  @SlotChange('header')
  @SlotChange('footer')
  private reactToSlotChange(nodes: Node[]) {
    console.log(nodes)
  }

  render() {
    return html`<slot name="header"></slot><hr/><slot></slot><hr/><slot name="footer"></slot>`
  }
}

export const Controller = {
  render: () => {
    const addToSlot = (name?: string ) => () => {
      const hostElement = document.querySelector('test-slot-controller')

      const newElement = document.createElement('div')
      if (name) {
        newElement.slot = name
        newElement.textContent = `Added to "${name}".`
      } else {
        newElement.textContent = `Added to default slot.`
      }

      hostElement?.appendChild(newElement)
    }

    return html`
      <button @click="${addToSlot('header')}">Add to header</button>
      <button @click="${addToSlot()}">Add to default</button>
      <button @click="${addToSlot('footer')}">Add to footer</button>
      <test-slot-controller>
      </test-slot-controller>`
  }
}
