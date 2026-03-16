---
title: Options
description: Collect option-like elements from slots.
---

# Options

This mechanism is a small specialization of the slot helpers for option-like children.

## Exports

- `SelectableOptions`

## `@SelectableOptions(slotName?)`

Collects slotted elements that expose both `value` and `selected` properties.

```ts
@SelectableOptions()
options: MyOption[] = [];
```

## When to use it

- custom select components
- listbox-like parents
- any parent-child contract where the child exposes `value` and `selected`

## Notes

- Internally this is built on top of `SlottedNodes`.
- It is a convenience filter, not a full selection model.
