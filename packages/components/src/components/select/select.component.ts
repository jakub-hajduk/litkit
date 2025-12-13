import { customElement, property, query } from "lit/decorators.js";
import { Listen, Role, RovingTabindexController } from "litkit";
import { MyOption } from "../option/option.component";
import { css, html, LitElement } from "lit";
import { CustomFormField } from "../../mixins/form/custom-form-field.mixin";
import { SlottedNodes } from "litkit";
import { Focusable } from "../../mixins/focusable/focusable.mixin";
import { ListenKeys } from "litkit";
import "../dropdown/dropdown.component";
import { MyDropdown } from "../dropdown/dropdown.component";

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
      transition: box-shadow 100ms ease-in-out;
  }

  :host(:focus-within) {
      outline: none;
      box-shadow:
          0 0 0 3px white,
          0 0 0 6px #4E8098;
  }

  my-dropdown {
    position-anchor: --reference-element;
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

  rovingTabindex = new RovingTabindexController(this, {
    getElements: () => this.options,
  })

  @property({ type: String, reflect: true })
  value?: string

  @query('my-dropdown')
  dropdown!: MyDropdown;

  @Listen('click')
  @ListenKeys('keydown', ['ArrowDown', 'ArrowUp', 'Enter', 'Space'])
  openDropdown(event: Event) {
    event.stopImmediatePropagation();
    event.preventDefault();
    if (event.target !== this) return
    this.dropdown.show()
    this.rovingTabindex.focus(this.currentlySelectedTarget)
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
