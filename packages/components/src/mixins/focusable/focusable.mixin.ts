import type { PropertyValues } from 'lit'
import type { Constructor, LitConstructor } from '../../types/types'

export interface FocusableElementInterface {
  focus(options?: FocusOptions): void;
  blur(): void;
  disableFocus(): void;
  enableFocus(): void;
}

/**
 * Focusable mixin
 *
 * Mixin that makes element focusable.
 */
export const Focusable = <Base extends LitConstructor>(superClass: Base) => {
  class FocusableElement extends superClass {
    connectedCallback() {
      super.connectedCallback();

      if (!this.hasAttribute('tabindex')) {
        this.tabIndex = 0;
      }
    }

    protected firstUpdated(_changedProperties: PropertyValues) {
      super.firstUpdated(_changedProperties);
      this.tabIndex = 0;
    }

    disableFocus() {
      this.tabIndex = -1;
    }

    enableFocus() {
      this.tabIndex = 0;
    }

    focus(options?: FocusOptions) {
      super.focus(options);
    }

    blur() {
      super.blur();
    }
  }

  return FocusableElement as Constructor<FocusableElementInterface> & Base;
};
