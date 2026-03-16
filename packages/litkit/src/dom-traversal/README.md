---
title: DOM Traversal
description: Typed DOM traversal helpers for Lit and plain custom elements.
---

# DOM Traversal

These helpers trade selector strings for runtime type checks.

## Exports

- `closestOfType`
- `directChildrenOfType`
- `firstOfType`
- `lastOfType`
- `nestedChildrenOfType`
- `nextOfType`
- `prevOfType`
- `siblingsOfType`

## Example

```ts
const form = closestOfType(button, HTMLFormElement);
const tabs = directChildrenOfType(tablist, HTMLButtonElement);
const nextTab = nextOfType(activeTab, HTMLButtonElement);
```

## When to use it

- when `querySelector` is too loose
- when you want typed return values
- when DOM structure matters more than CSS selectors

## Notes

- These helpers are framework-agnostic.
- They are part of the public package surface even though they do not live under `mechanisms`.
