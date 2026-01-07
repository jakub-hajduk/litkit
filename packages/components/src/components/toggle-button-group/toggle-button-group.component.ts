import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  LeftRightFocusStrategy,
  Listen,
  Role,
  RovingTabindexController,
  SlottedElementsOfType,
} from 'litkit';
import { CustomFormField } from '../../mixins/form/custom-form-field.mixin';
import { ToggleButtonComponent } from '../toggle-button/toggle-button.component';
import styles from './toggle-button-group.styles';

@Role('radiogroup')
@customElement('tru-toggle-button-group')
export class ToggleButtonGroupComponent extends CustomFormField(LitElement) {
  static styles = [styles];

  currentlySelectedTarget?: ToggleButtonComponent;

  @SlottedElementsOfType(null, [ToggleButtonComponent])
  buttons: ToggleButtonComponent[] = [];

  rovingTabindex: RovingTabindexController<ToggleButtonComponent> =
    new RovingTabindexController(this, {
      getElements: () => this.buttons,
      getCurrentElement: () => this.currentlySelectedTarget,
      strategy: new LeftRightFocusStrategy(),
    });

  @property({ type: String, reflect: true })
  value?: string = '';

  @Listen('selected')
  select(event: CustomEvent<string>): void {
    const target = event.target as ToggleButtonComponent;
    if (this.currentlySelectedTarget === target) return;

    if (this.currentlySelectedTarget) {
      this.currentlySelectedTarget.selected = false;
    }

    this.currentlySelectedTarget = target;
    this.value = target.value;
  }

  render() {
    return html`<div id="container"><slot></slot></div>`;
  }
}
