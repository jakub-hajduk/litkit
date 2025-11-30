export class CustomEventEmitter<T = unknown> {
  private readonly options: CustomEventInit;
  private element: HTMLElement | Document;
  private readonly name: string;

  constructor(
    element: HTMLElement | Document,
    name: string,
    options?: CustomEventInit<T>
  ) {
    this.element = element;
    this.name = name;

    this.options = {
      bubbles: false,
      cancelable: false,
      composed: true,
      detail: {},
      ...options,
    };
  }

  /**
   * returns false if event was prevented (event.preventDefault() was called)
   * Otherwise returns true.
   *
   * In order to make event possible to prevent, 'cancelable' option needs to be set to true.
   */
  emit(value?: T): boolean {
    this.options.detail = value || undefined;

    const customEvent = new CustomEvent<T>(this.name, this.options);
    return this.element.dispatchEvent(customEvent);
  }
}
