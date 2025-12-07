export class InputEventEmitter {
  private readonly options: InputEventInit;
  private element: HTMLElement | Document;

  constructor(
    element: HTMLElement | Document,
    options?: InputEventInit
  ) {
    this.element = element;

    this.options = {
      bubbles: true,
      cancelable: false,
      composed: false,
      ...options,
    };
  }

  emit(): boolean {
    const inputEvent = new InputEvent('input', this.options);
    return this.element.dispatchEvent(inputEvent);
  }
}
