---
title: Examples and Recipes
description: Practical component patterns built with litkit.
---

# Examples and Recipes

These examples focus on how the package feels in real component code.

## Toggle button with host state

```ts
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Action, Aria, CSSState, Role } from 'litkit';

@customElement('ui-toggle')
@Role('button')
export class UiToggle extends LitElement {
  @property({ type: Boolean })
  @Aria('ariaPressed', (value) => String(Boolean(value)))
  @CSSState('on')
  pressed = false;

  @Action()
  private activate() {
    this.pressed = !this.pressed;
  }

  render() {
    return html`<slot></slot>`;
  }
}
```

Use this recipe when a custom element should behave like a semantic control without repeating accessibility plumbing.

## Select-like component driven by slotted options

```ts
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { SelectableOptions, SlottedText } from 'litkit';

@customElement('ui-option')
export class UiOption extends LitElement {
  @property() value = '';
  @property({ type: Boolean }) selected = false;

  render() {
    return html`<slot></slot>`;
  }
}

@customElement('ui-select')
export class UiSelect extends LitElement {
  @SelectableOptions()
  options: UiOption[] = [];

  @SlottedText('label')
  label = '';

  render() {
    return html`
      <label><slot name="label"></slot></label>
      <slot></slot>
    `;
  }
}
```

Use this when the parent component should consume structured child elements from light DOM.

## Custom input that emits native form events

```ts
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ChangeEventEmitter, DelegateValue, InputEventEmitter } from 'litkit';

@customElement('ui-field')
export class UiField extends LitElement {
  @property()
  @DelegateValue('input', 'value')
  value = '';

  private readonly inputEvent = new InputEventEmitter(this);
  private readonly changeEvent = new ChangeEventEmitter(this);

  private onInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.inputEvent.emit();
  }

  private onChange() {
    this.changeEvent.emit();
  }

  render() {
    return html`
      <input
        .value=${this.value}
        @input=${this.onInput}
        @change=${this.onChange}
      />
    `;
  }
}
```

Use this when your element should participate in the same event flow as native form controls.

## Menu or listbox with roving tabindex

```ts
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { RovingTabindexController, UpDownFocusStrategy } from 'litkit';

@customElement('ui-menu')
export class UiMenu extends LitElement {
  private readonly roving = new RovingTabindexController<HTMLElement>(this, {
    strategy: new UpDownFocusStrategy(),
    getElements: () =>
      this.renderRoot
        .querySelector('slot')
        ?.assignedElements()
        .filter((el): el is HTMLElement => el instanceof HTMLElement) ?? [],
    getCurrentElement: () => undefined,
  });

  render() {
    return html`<slot></slot>`;
  }
}
```

Use this when only one child should be tabbable at a time.

## Reacting to slot changes imperatively

```ts
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { SlotChangeController } from 'litkit';

@customElement('ui-panel')
export class UiPanel extends LitElement {
  private readonly slots = new SlotChangeController(this);

  constructor() {
    super();
    this.slots.subscribe(null, (nodes) => {
      console.log('slot content changed', nodes);
    });
  }

  render() {
    return html`<slot></slot>`;
  }
}
```

Use this when a simple property decorator is not enough and you need direct subscription logic.
