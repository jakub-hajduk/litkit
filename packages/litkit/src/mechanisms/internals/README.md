---
title: Internals
description: Access and share ElementInternals in Lit components.
---

# Internals

This mechanism exposes the low-level helper used by `Role`, `Aria`, and `CSSState`.

## Exports

- `ensureInternals`
- `Internals`

## `ensureInternals(element)`

Returns a cached `ElementInternals` instance for the element, creating it if necessary.

```ts
const internals = ensureInternals(this);
internals.role = 'dialog';
```

## When to use it

- when you need direct imperative access to `ElementInternals`
- when you are writing your own decorators or controllers on top of `litkit`

## Notes

- The helper stores the internals instance under a unique symbol to avoid collisions.
