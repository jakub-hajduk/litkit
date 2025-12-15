/**
 * A utility class for creating and dispatching `input` events. This is particularly useful
 * for custom form-associated components that need to notify their parent form that their
 * value has changed.
 *
 * By dispatching a native `input` event, you can ensure that your custom component
 * integrates seamlessly with standard form behaviors.
 *
 * @example
 *   @customElement('my-input')
 *   export class MyInput extends LitElement {
 *     @property() value: string;
 *
 *     private inputEvent = new InputEventEmitter(this);
 *
 *     private onValueChange(newValue: string) {
 *       this.value = newValue;
 *       this.inputEvent.emit();
 *     }
 *
 *     render() {
 *       return html`<input .value=${this.value} @input=${(e: Event) => this.onValueChange(e.target.value)}>`;
 *     }
 *   }
 *
 */
export class InputEventEmitter {
  private readonly options: InputEventInit;
  private element: HTMLElement | Document;

  constructor(element: HTMLElement | Document, options?: InputEventInit) {
    this.element = element;

    this.options = {
      bubbles: true,
      cancelable: false,
      composed: false,
      ...options,
    };
  }

  /**
   * Dispatches an `input` event from the element.
   * @returns `false` if the event was cancelled, `true` otherwise.
   */
  emit(): boolean {
    const inputEvent = new InputEvent('input', this.options);
    return this.element.dispatchEvent(inputEvent);
  }
}

('hello');
