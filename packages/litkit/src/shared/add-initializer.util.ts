import type { Initializer, LitElement, ReactiveElement } from 'lit';
import type { Constructor } from './types';

/**
 * A utility function that simplifies the process of adding an initializer to a Lit element's
 * constructor. Lit initializers are functions that run when a component instance is created,
 * and they are the standard way to set up reactive controllers and other instance-specific logic
 * for decorators.
 *
 * This function handles the logic of finding the correct constructor, whether it's called on
 * an instance or a constructor, and then calls `addInitializer` on it.
 *
 * This is primarily an internal utility used by the decorators in this library.
 *
 * @param target The Lit element instance or constructor to which the initializer should be added.
 * @param initializer The initializer function to add. This function will be called with the
 *                    component instance when it's created.
 */
export function addInitializer<T extends LitElement>(
  target: T | Constructor<T>,
  initializer: Initializer,
): void {
  let ctor = target.constructor as typeof ReactiveElement;

  if (typeof target === 'function') {
    ctor = target as unknown as typeof ReactiveElement;
  }

  ctor.addInitializer(initializer);
}
