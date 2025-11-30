import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { NoopMixin } from '../../mixins/noop'

@customElement("my-simple")
export class SingleSelectComponent extends NoopMixin(LitElement) {
  static styles = [
    css`
			:host {
				display: block;
			}
		`
  ];

  @property() name = "World";

  render() {
    return html`<h1>Hello, ${this.name}</h1>`;
  }
}
