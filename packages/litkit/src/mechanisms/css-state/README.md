---
title: CSS State
description: Expose host component state to CSS with the :state() pseudo-class.
---

# CSS State

This mechanism reflects component state into `ElementInternals.states`.

## Exports

- `CSSState`

## `@CSSState(state, converter?)`

Use it to turn a reactive property into a host CSS state.

```ts
@property({ type: Boolean })
@CSSState('open')
open = false;
```

```css
my-dialog:state(open) {
  opacity: 1;
}
```

## When to use it

- when the state belongs to the host element
- when host styling should follow component state
- when you want a cleaner alternative to mirroring state into attributes

## Notes

- This mechanism depends on `ElementInternals`.
- If you need custom truthiness, pass a converter.
