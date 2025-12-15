/**
 * A utility class for creating and dispatching `change` events. This is useful for
 * custom form-associated components that need to signal that their value has been
 * committed by the user.
 *
 * Dispatching a native `change` event allows your custom component to integrate
 * with standard form behaviors, such as triggering validation or other form-level logic.
 *
 * @example
 *   @customElement('my-slider')
 *   export class MySlider extends LitElement {
 *     @property({ type: Number }) value = 0;
 *
 *     private changeEvent = new ChangeEventEmitter(this);
 *
 *     private onValueCommit() {
 *       // This might be called on 'mouseup' or 'touchend', for example
 *       this.changeEvent.emit();
 *     }
 *
 *     render() {
 *       return html`<input type="range" .value=${this.value} @change=${() => this.onValueCommit()}>`;
 *     }
 *   }
 *
 */
export class ChangeEventEmitter {
  private readonly options: EventInit;
  private element: HTMLElement | Document;

  constructor(element: HTMLElement | Document, options?: EventInit) {
    this.element = element;

    this.options = {
      bubbles: true,
      cancelable: false,
      composed: false,
      ...options,
    };
  }

  /**
   * Dispatches a `change` event from the element.
   * @returns `false` if the event was cancelled, `true` otherwise.
   */
  emit(): boolean {
    const changeEvent = new Event('change', this.options);
    return this.element.dispatchEvent(changeEvent);
  }
}
