import { customElement, property, query } from "lit/decorators.js";
import { Listen, Role, RovingTabindexListController } from "litkit";
import { MyOption } from "./option.component";
import { css, html, LitElement } from "lit";
import { CustomFormField } from "../../mixins/form/custom-form-field.mixin";
import { SlottedNodes } from "litkit";
import './dropdown.component'
import { MyDropdown } from "./dropdown.component";
import { Action } from "litkit";
import { Focusable } from "../../mixins/focusable/focusable.mixin";
import { ListenKeys } from "litkit";

const styles = css`
  :host {
      display: block;
      align-items: center;
      padding: 8px 12px;
      width: 100%;
      border: 1px solid #ccc;
      box-sizing: border-box;
      border-radius: 4px;
      anchor-name: --reference-element;
      cursor: pointer;
  }

  .dropdown {
    position-anchor: --reference-element;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 4px;
  }
  `

const nonDisabled = (node: Node) => node instanceof MyOption && node.disabled === false

@Role('combobox')
@customElement('my-select')
export class MySelect extends Focusable(CustomFormField(LitElement)) {
  static styles = [
    styles
  ]

  currentlySelectedTarget?: MyOption;

  @SlottedNodes(null, nonDisabled)
  options: MyOption[] = [];

  focusTrap = new RovingTabindexListController(this, {
    getElements: () => this.options
  })

  @property({ type: String, reflect: true })
  value?: string

  @query('my-dropdown')
  dropdown!: MyDropdown;

  @Listen('click')
  @ListenKeys('keydown', ['ArrowDown', 'ArrowUp', 'Enter', 'Space'])
  openDropdown() {
    console.log( this )
    this.dropdown.show()
  }

  @Listen('selected')
  select(event: CustomEvent<string>) {
    const target = event.target as MyOption
    if (this.currentlySelectedTarget === target) return

    if (this.currentlySelectedTarget) {
      this.currentlySelectedTarget.selected = false;
    }

    this.currentlySelectedTarget = target;
    this.value = target.value

    this.dropdown.hide()
    this.focus()
  }

  render() {
    return html`
        <div>
          ${this.currentlySelectedTarget?.label || 'Nothing selected'}
        </div>
        <my-dropdown class="dropdown" role="listbox">
            <slot ></slot>
        </my-dropdown>
    `;
  }
}
