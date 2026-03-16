import type { LitElement, ReactiveElement } from 'lit';
import { addInitializer, ensureHostUpdateController, Listen } from 'litkit';
import type { Constructor, LitConstructor } from '../types';
import type { SelectableInterface } from '../selectable/selectable.mixin';

export type SelectableElement = LitElement & SelectableInterface;

export interface WithSingleSelectInterface {
  value?: unknown;
  currentlySelectedTarget: SelectableElement | undefined;
  options: SelectableElement[];
}

export const WithSingleSelect = <Base extends LitConstructor>(
  superClass: Base,
) => {
  class WithSingleSelectMixin
    extends superClass
    implements WithSingleSelectInterface
  {
    currentlySelectedTarget: SelectableElement | undefined = undefined;

    options: any = [];

    @Listen('selected', { eventId: 'WithSingleSelect:selected' })
    selected(event: CustomEvent) {
      if (this.currentlySelectedTarget) {
        this.currentlySelectedTarget.selected = false;
      }
      if ('value' in this) {
        this.value = event.detail;
      }
      this.currentlySelectedTarget = event.target as SelectableElement;
    }
  }

  addInitializer(
    WithSingleSelectMixin,
    (instance: ReactiveElement & WithSingleSelectInterface) => {
      const hostUpdateController = ensureHostUpdateController(instance);

      hostUpdateController.watch(
        'options',
        (options: SelectableElement[]) => {
          if (!Array.isArray(options) || options.length === 0) return;

          let currentlySelectedTarget: SelectableElement | undefined;

          for (const option of options) {
            if (option.selected && currentlySelectedTarget === undefined) {
              currentlySelectedTarget = option;
            }

            if (
              instance.value === option.value &&
              currentlySelectedTarget === undefined
            ) {
              currentlySelectedTarget = option;
            }

            option.selected = false;
          }

          if (currentlySelectedTarget === undefined) return;

          instance.currentlySelectedTarget = currentlySelectedTarget;

          if ('value' in instance && currentlySelectedTarget !== undefined) {
            instance.value = currentlySelectedTarget?.value;
          }

          currentlySelectedTarget.selected = true;
        },
        { once: true },
      );
    },
  );

  return WithSingleSelectMixin as Constructor<WithSingleSelectInterface> & Base;
};
