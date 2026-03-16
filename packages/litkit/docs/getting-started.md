---
title: Getting Started
description: Install litkit, learn the import model, and wire your first Lit component.
---

# Getting Started

`litkit` works best when you treat it as a thin layer on top of standard Lit code. You still build normal `LitElement` components. `litkit` just removes repeated setup work.

## Install

`lit` is a peer dependency.

```bash
pnpm add lit litkit
```

## Import model

You can import from the root package:

```ts
import { Aria, CSSState, SlotChange, SlottedElements } from 'litkit';
```

Or from a focused subpath:

```ts
import { CSSState } from 'litkit/css-state';
import { Listen } from 'litkit/event-listener';
import { SlottedText } from 'litkit/slots';
```

Use root imports when convenience matters. Use subpath imports when you want docs and imports to mirror the feature area more closely.

## First component

```ts
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Action, Aria, CSSState, Role } from 'litkit';

@customElement('demo-toggle')
@Role('button')
export class DemoToggle extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      cursor: pointer;
      user-select: none;
    }

    :host(:state(on)) {
      color: green;
    }
  `;

  @property({ type: Boolean })
  @Aria('ariaPressed', (value) => String(Boolean(value)))
  @CSSState('on')
  pressed = false;

  @Action()
  private activate() {
    this.pressed = !this.pressed;
  }

  render() {
    return html`<slot>${this.pressed ? 'On' : 'Off'}</slot>`;
  }
}
```

This single component already shows the core package style:

- `@Role` defines host semantics
- `@Aria` reflects host accessibility state
- `@CSSState` exposes host state to CSS
- `@Action` turns one method into a generic activation handler

## What to learn next

- Read [Why litkit](./why-litkit.md) to understand where it adds value.
- Read [Mental Model](./mental-model.md) before building larger components.
- Read [Examples and Recipes](./examples-and-recipes.md) when you want concrete patterns.
