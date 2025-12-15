import type { LitElement, ReactiveElement } from 'lit';
import { ensureInternals, Internals } from '../internals';
import type { AriaRole } from './types';

/**
 * A class decorator that sets the `role` attribute on the component's host element.
 * This is a convenient way to define the accessibility role of a custom element,
 * making it more understandable to assistive technologies.
 *
 * This decorator uses `ElementInternals` to set the `role` on the host element.
 * It should be applied to a LitElement class.
 *
 * @example
 *   @customElement('my-button')
 *   @Role('button')
 *   export class MyButton extends LitElement {
 *     render() {
 *       return html`<slot></slot>`;
 *     }
 *   }
 *
 * @param role The ARIA role to be assigned to the custom element. For example, 'button', 'checkbox', 'dialog'.
 */
export function Role(role: AriaRole): ClassDecorator {
  return (<ElementClass extends typeof LitElement>(ctor: ElementClass) => {
    ctor.addInitializer(
      (instance: ReactiveElement & { [Internals]?: ElementInternals }) => {
        const internals = (instance[Internals] ??= ensureInternals(instance));

        internals.role = role as string;
      },
    );
  }) as ClassDecorator;
}
