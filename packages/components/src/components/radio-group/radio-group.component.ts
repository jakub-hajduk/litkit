import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  Listen,
  Role,
  RovingTabindexController,
  SlottedElementsOfType,
} from 'litkit';
import { CustomFormField } from '../../mixins/form/custom-form-field.mixin';
import { RadioComponent } from '../radio/radio.component';
import styles from './radio-group.styles';

@Role('radiogroup')
@customElement('tru-radio-group')
export class RadioGroupComponent extends CustomFormField(LitElement) {
  static styles = [styles];

  currentlySelectedTarget?: RadioComponent;

  @SlottedElementsOfType(null, [RadioComponent])
  radios: RadioComponent[] = [];

  rovingTabindex: RovingTabindexController<RadioComponent> =
    new RovingTabindexController(this, {
      getElements: () => this.radios,
      getCurrentElement: () => this.currentlySelectedTarget,
    });

  @property({ type: String, reflect: true })
  value?: string = '';

  @Listen('selected')
  select(event: CustomEvent<string>): void {
    const target = event.target as RadioComponent;
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
