import type {
  LitElement,
  ReactiveController,
  ReactiveControllerHost,
  ReactiveElement,
} from 'lit';
import type { Handler } from './types';

/**
 * A unique symbol used to store the `HostUpdateController` instance on the host element,
 * preventing property name collisions.
 */
export const HostUpdateListener: unique symbol = Symbol('Update');

/**
 * A reactive controller that allows running callbacks when specific properties on the host element change.
 * It hooks into Lit's update lifecycle to watch for property updates and execute registered handlers.
 *
 * This controller is the foundation for many decorators in this library that need to react to state
 * changes, such as `@Aria` or `@State`. While it can be used directly, it's often more convenient
 * to use the decorators that are built on top of it.
 *
 * @example
 *   @customElement('my-component')
 *   export class MyComponent extends LitElement {
 *     @property({ type: String })
 *     name = 'World';
 *
 *     private updateController = new HostUpdateController(this);
 *
 *     constructor() {
 *       super();
 *       this.updateController.watch('name', (newValue, oldValue) => {
 *         console.log(`Name changed from "${oldValue}" to "${newValue}"`);
 *       });
 *     }
 *
 *     render() {
 *       return html`Hello, ${this.name}!`;
 *     }
 *   }
 */
export class HostUpdateController implements ReactiveController {
  host: ReactiveControllerHost;
  handlers: Record<PropertyKey, Handler<any>[]> = {};

  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
  }

  /**
   * Registers a handler function to be called when a specific property on the host element changes.
   * The handler is also called immediately with the current property value.
   *
   * @param property The name of the property to watch.
   * @param handler A function to be called with the new and old values of the property.
   */
  watch<T>(property: PropertyKey, handler: Handler<T>): void {
    (this.handlers[property] ??= []).push(handler);
    // @ts-expect-error - To be done later... (Yeah, sure...)
    handler(this.host[property], undefined);
  }

  /**
   * A Lit lifecycle method that is called when the host element is about to update.
   * This method checks for changed properties and invokes the corresponding handlers.
   * You should not need to call this method directly.
   */
  async hostUpdate(): Promise<void> {
    // @ts-expect-error - We're touching Lit's internals
    for (const [property, oldValue] of this.host._$changedProperties) {
      // @ts-expect-error - We need to get to the property.
      const newValue = this.host[property];

      if (!this.handlers[property]) continue;

      await this.host.updateComplete;
      for (const handler of this.handlers[property]) {
        await Promise.resolve(handler(newValue, oldValue));
      }
    }
  }
}

/**
 * A utility function that ensures a `HostUpdateController` instance exists for a given
 * component instance. If an instance already exists, it returns it; otherwise, it creates
 * a new one and attaches it to the host.
 *
 * This is used internally by decorators to get a shared controller instance.
 *
 * @param instance The component instance.
 * @returns The `HostUpdateController` for the instance.
 */
export function ensureHostUpdateController<
  E extends LitElement | ReactiveElement,
>(instance: E): HostUpdateController {
  return ((instance as any)[HostUpdateListener] ??= new HostUpdateController(
    instance,
  ));
}
