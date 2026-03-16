---
title: ARIA
description: Reflect Lit properties to host ARIA state with ElementInternals.
---

# ARIA

This mechanism covers host accessibility semantics.

## Exports

- `Role`
- `Aria`
- `AriaProperty` type

## When to use it

Use this mechanism when a custom element should expose accessibility meaning through the host rather than through an internal node.

## `@Role(role)`

Sets a fixed ARIA role on the host through `ElementInternals`.

```ts
@customElement('app-tab')
@Role('tab')
export class AppTab extends LitElement {}
```

## `@Aria(ariaProperty, converter?)`

Reflects a reactive property into a host ARIA property.

```ts
@property({ type: Boolean })
@Aria('ariaExpanded', (value) => String(Boolean(value)))
open = false;
```

## Notes

- Both helpers depend on `attachInternals()`.
- `@Aria` clears the property when the decorated value becomes falsy.
- This mechanism pairs naturally with [`css-state`](../css-state/README.md).
