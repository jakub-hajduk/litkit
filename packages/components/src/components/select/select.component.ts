import { customElement, property, query } from "lit/decorators.js";
import { SlottedNodes, ListenKeys, Listen, Role, RovingTabindexController } from "litkit";
import { MyOption } from "../option/option.component";
import { css, html, LitElement, type CSSResult, type TemplateResult } from "lit";
import { CustomFormField } from "../../mixins/form/custom-form-field.mixin";
import { Focusable } from "../../mixins/focusable/focusable.mixin";
import { MyDropdown } from "../dropdown/dropdown.component";

const styles = css`
  :host {
      display: block;
      align-items: center;
      padding: 8px 12px;
      width: 100%;
      border: 1px solid var(--neutral400);
      color: var(--neutral1200);
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
          0 0 0 6px var(--neutral400);
  }

  my-dropdown {
    position-anchor: --reference-element;
  }
  `

const nonDisabled = (node: Node) => node instanceof MyOption && node.disabled === false

@Role('combobox')
@customElement('my-select')
export class MySelect extends Focusable(CustomFormField(LitElement)) {
  static styles: CSSResult[] = [
    styles
  ]

  currentlySelectedTarget?: MyOption;

  @SlottedNodes(null, nonDisabled)
  options: MyOption[] = [];

  rovingTabindex: RovingTabindexController<MyOption> = new RovingTabindexController(this, {
    getElements: () => this.options,
  })

  @property({ type: String, reflect: true })
  value?: string

  @query('my-dropdown')
  dropdown!: MyDropdown;

  @Listen('click')
  @ListenKeys('keydown', ['ArrowDown', 'ArrowUp', 'Enter', 'Space'])
  openDropdown(event: Event): void {
    event.stopImmediatePropagation();
    event.preventDefault();
    if (event.target !== this) return
    this.dropdown.show()
    this.rovingTabindex.focus(this.currentlySelectedTarget)
  }

  @Listen('selected')
  select(event: CustomEvent<string>): void {
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

  render(): TemplateResult {
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
