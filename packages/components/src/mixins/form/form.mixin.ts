import { LitElement, ReactiveElement } from 'lit'
import { property, query } from 'lit/decorators.js';
import { type EventName, HostListener, HostListenerController, HostUpdate, Internals, type ListenOptions } from 'litkit'
import { BaseComponent, BaseComponentConstructor } from '../../components/base/base.component'
import { Constructor } from '../../types/types'

type FormValue = File | string | FormData | null;

export type AccessibleFieldInterface = BaseComponent & {
  label: string;
  description: string;
  _delegatedElement?: HTMLElement | null;
  emitChange(): void;
  emitInput(): void;
};

export const FormField = <Base extends BaseComponentConstructor>(superClass: Base) => {
  class BasicA11yElement extends superClass {
    static formAssociated = true;

    value: FormValue = null;

    /**
     * field name for screen readers. This should be used only when field is used without acc-label element.
     */
    @property({ type: String, reflect: true, attribute: 'label' })
    label?: string;

    /**
     * field description for screen readers. This should be used only when field is used without acc-label element.
     */
    @property({ type: String, reflect: true, attribute: 'description' })
    description?: string;

    emitChange() {
      const changeEvent = new Event('change', { bubbles: true });
      this.dispatchEvent(changeEvent);
    }

    emitInput() {
      const changeEvent = new InputEvent('input', { bubbles: true });
      this.dispatchEvent(changeEvent);
    }

    createRenderRoot() {
      return this.attachShadow({ mode: 'closed', delegatesFocus: true });
    }

    connectedCallback() {
      super.connectedCallback();

      this[HostUpdate].watch<typeof this.value>('value', (value) => {
        this[Internals].setFormValue(value);
      });

      this[HostUpdate].watch('value', () => {
        this.emitInput();
      });

      this[HostUpdate].watch('value', () => {
        this.emitChange();
      });

      this[HostUpdate].watch('description', () => {
        this[Internals].ariaDescription = this.description ?? null;
      });

      this[HostUpdate].watch('label', () => {
        this[Internals].ariaLabel = this.label ?? null;
      });

      if ( this._delegatedElement ) {
        this._delegatedElement
      }
    }
  }

  return BasicA11yElement as Constructor<AccessibleFieldInterface> & Base;
};
