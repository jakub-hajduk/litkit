import { property } from 'lit/decorators.js'
import { Aria, HostListener, HostUpdate, Internals } from 'litkit'
import { BaseComponent } from '../../components/base/base.component'
import { Constructor } from '../../types/types'

type FormValue = File | string | FormData | null;

export type AccessibleFieldInterface = BaseComponent & {
  label?: string;
  description?: string;
  _delegatedElement?: HTMLElement | null;
  emitChange(): void;
  emitInput(): void;
};

export const FormField = <Base extends Constructor<AccessibleFieldInterface>>(superClass: Base) => {
  class BasicA11yElement extends superClass {
    static shadowRootOptions = {mode: 'closed', delegatesFocus: true};

    static formAssociated = true;

    value: FormValue = null;

    /**
     * field name for screen readers. This should be used only when field is used without acc-label element.
     */
    @Aria('ariaLabel')
    @property({ type: String, reflect: true, attribute: 'label' })
    label?: string = '';

    /**
     * field description for screen readers. This should be used only when field is used without acc-label element.
     */
    @Aria('ariaDescription')
    @property({ type: String, reflect: true, attribute: 'description' })
    description?: string = '';

    emitChange() {
      const changeEvent = new Event('change', { bubbles: true });
      this.dispatchEvent(changeEvent);
    }

    emitInput() {
      const changeEvent = new InputEvent('input', { bubbles: true });
      this.dispatchEvent(changeEvent);
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
    }

    async firstUpdated() {
      await this.updateComplete;

      if (this._delegatedElement) {
        this[HostListener].registerListener('input', (event: Event) => {
          event.preventDefault()
          this.value = (event.target as HTMLInputElement).value;
          this.emitInput()
        }, { element: this._delegatedElement })
        .attach()

        this[HostListener].registerListener('change', (event: Event) => {
          event.preventDefault()
          this.emitChange()
        }, { element: this._delegatedElement })
        .attach()


        this[HostUpdate].watch('label', (value: string) => {
          this._delegatedElement?.setAttribute('aria-label', value);
        })

        this[HostUpdate].watch('description', (value: string) => {
          this._delegatedElement?.setAttribute('aria-description', value);
        })
      }
    }
  }

  return BasicA11yElement as Constructor<AccessibleFieldInterface> & Base;
};
