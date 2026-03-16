---
title: Roving Tabindex
description: Manage composite-widget keyboard focus using the roving tabindex pattern.
---

# Roving Tabindex

This mechanism implements the roving tabindex pattern for groups of focusable elements.

## Exports

- `RovingTabindexController`
- `UpDownFocusStrategy`
- `LeftRightFocusStrategy`
- roving tabindex strategy types

## `RovingTabindexController`

```ts
private readonly roving = new RovingTabindexController<HTMLElement>(this, {
  strategy: new UpDownFocusStrategy(),
  getElements: () =>
    this.renderRoot
      .querySelector('slot')
      ?.assignedElements()
      .filter((el): el is HTMLElement => el instanceof HTMLElement) ?? [],
  getCurrentElement: () => undefined,
});
```

## Built-in strategies

### `UpDownFocusStrategy`

Good for:

- menus
- option lists
- vertical listboxes

Keys:

- `ArrowUp`
- `ArrowDown`
- `Home`
- `End`

### `LeftRightFocusStrategy`

Good for:

- tabs
- toolbars
- segmented controls

Keys:

- `ArrowLeft`
- `ArrowRight`
- `Home`
- `End`

## Notes

- One managed element gets `tabIndex = 0`; the rest get `-1`.
- Disabled elements are skipped during focus assignment.
- The default controller behavior reads elements from the default slot and uses `UpDownFocusStrategy`.
