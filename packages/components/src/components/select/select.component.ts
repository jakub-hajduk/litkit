import { type CSSResult, html, LitElement, type TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import {
  Listen,
  ListenKeys,
  Role,
  RovingTabindexController,
  SlottedNodes,
} from 'litkit';
import { Focusable } from '../../mixins/focusable/focusable.mixin';
import { CustomFormField } from '../../mixins/form/custom-form-field.mixin';
import '../dropdown/dropdown.component';
import { formFieldStyles } from '../../shared/styles/field.styles';
import type { DropdownComponent } from '../dropdown/dropdown.component';
import { OptionComponent } from '../option/option.component';
import styles from './select.styles';

const nonDisabled = (node: Node) =>
  node instanceof OptionComponent && node.disabled === false;

@Role('combobox')
@customElement('tru-select')
export class SelectComponent extends Focusable(CustomFormField(LitElement)) {
  static styles: CSSResult[] = [styles, formFieldStyles()];

  currentlySelectedTarget?: OptionComponent;

  @SlottedNodes(null, nonDisabled)
  options: OptionComponent[] = [];

  rovingTabindex: RovingTabindexController<OptionComponent> =
    new RovingTabindexController(this, {
      getElements: () => this.options,
    });

  @property({ type: String, reflect: true })
  value?: string;

  @query('#dropdown')
  dropdown!: DropdownComponent;

  @Listen('click')
  @ListenKeys('keydown', ['ArrowDown', 'ArrowUp', 'Enter', 'Space'])
  openDropdown(event: Event): void {
    event.stopImmediatePropagation();
    event.preventDefault();
    if (event.target !== this) return;
    this.dropdown.show();
    this.rovingTabindex.focus(this.currentlySelectedTarget);
  }

  @Listen('selected')
  select(event: CustomEvent<string>): void {
    const target = event.target as OptionComponent;
    if (this.currentlySelectedTarget === target) return;

    if (this.currentlySelectedTarget) {
      this.currentlySelectedTarget.selected = false;
    }

    this.currentlySelectedTarget = target;
    this.value = target.value;

    this.dropdown.hide();
    this.focus();
  }

  render(): TemplateResult {
    return html`
        <div id="container">
          ${this.currentlySelectedTarget?.label || 'Nothing selected'}
        </div>
        <tru-dropdown id="dropdown" role="listbox">
            <div id="option-list">
                <slot></slot>
            </divid>
        </tru-dropdown>
    `;
  }
}
