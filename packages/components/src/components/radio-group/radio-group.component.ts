import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Role, RovingTabindexController, SlottedElementsOfType } from 'litkit';
import { CustomFormField } from 'litkit-primitives';
import {
  type SelectableElement,
  WithSingleSelect,
} from 'litkit-primitives';
import { RadioComponent } from '../radio/radio.component';
import styles from './radio-group.styles';

@Role('radiogroup')
@customElement('tru-radio-group')
export class RadioGroupComponent extends CustomFormField(
  WithSingleSelect(LitElement),
) {
  static styles = [styles];

  currentlySelectedTarget: SelectableElement | undefined = undefined;

  @SlottedElementsOfType(null, [RadioComponent])
  options: RadioComponent[] = [];

  rovingTabindex: RovingTabindexController<RadioComponent> =
    new RovingTabindexController(this, {
      getElements: () => this.options,
      getCurrentElement: () => this.currentlySelectedTarget,
    });

  @property({ type: String, reflect: true })
  value?: string = '';

  render() {
    return html`<div id="container"><slot></slot></div>`;
  }
}
