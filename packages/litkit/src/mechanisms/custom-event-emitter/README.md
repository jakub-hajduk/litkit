---
title: Custom Event Emitter
description: Dispatch typed custom events from Lit components with less boilerplate.
---

# Custom Event Emitter

This mechanism is a typed wrapper around `CustomEvent` plus `dispatchEvent`.

## Exports

- `CustomEventEmitter`

## Example

```ts
private readonly selectedEvent = new CustomEventEmitter<string>(
  this,
  'selected',
  { bubbles: true, composed: true },
);

private select(value: string) {
  this.selectedEvent.emit(value);
}
```

## When to use it

- when the component emits named events with `detail`
- when you want a small, reusable event helper rather than ad hoc event creation

## Notes

- `emit()` returns `false` when a cancelable event was prevented.
