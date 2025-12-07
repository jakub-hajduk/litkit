export class ChangeEventEmitter {
  private readonly options: EventInit;
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
    const changeEvent = new Event('change', this.options);
    return this.element.dispatchEvent(changeEvent);
  }
}
