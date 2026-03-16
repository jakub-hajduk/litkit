import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  LeftRightFocusStrategy,
  Role,
  RovingTabindexController,
  SlottedElementsOfType,
} from 'litkit';
import { CustomFormField } from 'litkit-primitives';
import {
  type SelectableElement,
  WithSingleSelect,
} from 'litkit-primitives';
import { ToggleButtonComponent } from '../toggle-button/toggle-button.component';
import styles from './toggle-button-group.styles';

@Role('radiogroup')
@customElement('tru-toggle-button-group')
export class ToggleButtonGroupComponent extends CustomFormField(
  WithSingleSelect(LitElement),
) {
  static styles = [styles];

  currentlySelectedTarget: SelectableElement | undefined = undefined;

  @SlottedElementsOfType(null, [ToggleButtonComponent])
  options: ToggleButtonComponent[] = [];

  rovingTabindex: RovingTabindexController<ToggleButtonComponent> =
    new RovingTabindexController(this, {
      getElements: () => this.options,
      getCurrentElement: () => this.currentlySelectedTarget,
      strategy: new LeftRightFocusStrategy(),
    });

  @property({ type: String, reflect: true })
  value?: string = '';

  render() {
    return html`<div id="container"><slot></slot></div>`;
  }
}
