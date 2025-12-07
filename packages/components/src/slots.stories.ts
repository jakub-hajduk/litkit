import type { Meta } from '@storybook/web-components-vite'
import { css, html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SlotChange, SlottedNodes, SlottedText } from 'litkit'

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
  private reactToSlotChange(nodes: Node[], slot: HTMLSlotElement) {
    console.log(slot.name || 'default', nodes)
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

@customElement('test-slotted-text')
class SlottedTextCE extends LitElement{
  static styles = [css`
  slot {
      display: none;
  }`]

  @SlottedText('label')
  namedSlottedText: string

  @SlottedText()
  defaultSlottedText: string

  render() {
    return html`
      <p>text in named slot: <strong>${this.namedSlottedText}</strong></p>
      <p>text in default slot: <strong>${this.defaultSlottedText}</strong></p>
      <slot name="label"></slot>
      <slot></slot>`
  }
}

export const SlottedTextExample = {
  render: () => {
    return html`<test-slotted-text>
        <span slot="label">Some slotted text <b>And bold</b></span>
        Text in default slot
    </test-slotted-text>`
  }
}


function nd(node: Node): string {
  switch (node.nodeType) {
    case Node.TEXT_NODE:
      return 'TEXT_NODE'
      break
    case Node.COMMENT_NODE:
      return 'COMMENT_NODE'
      break
    default:
    case Node.ELEMENT_NODE:
      return (node as any).tagName || 'UNKNOWN_TAG'
      break
  }
}


@customElement('test-slotted-nodes')
class SlottedNodesCE extends LitElement{

  @SlottedNodes('named')
  namedNodes: Node[] = []

  @SlottedNodes()
  defaultNodes: Node[] = []

  @SlottedNodes(null, (node) => node.nodeType === Node.ELEMENT_NODE)
  filteredNodes: Node[] = []


  render() {
    return html`
      <div>
          <p>
              Nodes in named slot: ${this.namedNodes.map(nd).join(', ')}
          </p>
          <p>
            Nodes in default slot: ${this.defaultNodes.map(nd).join(', ')}
          </p>
          <p>
            Filtered nodes from default slot: ${this.filteredNodes.map(nd).join(', ')}
          </p>
      </div>
      <slot name="named"></slot>
      <slot></slot>`
  }
}

export const SlottedNodesExample = {
  render: () => {
    return html`<test-slotted-nodes>
        <div slot="named">
            <h1>Title</h1>
            <p>paragraph</p>
            <strong>Strong</strong>
        </div>

        <h1>Test</h1>
        <h2>Test 2</h2>
        <h3>Text 3</h3>

    </test-slotted-nodes>`
  }
}
