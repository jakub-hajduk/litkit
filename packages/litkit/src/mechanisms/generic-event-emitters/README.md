---
title: Generic Event Emitters
description: Emit native input and change events from custom elements.
---

# Generic Event Emitters

This mechanism helps custom elements participate in familiar browser form event flows.

## Exports

- `InputEventEmitter`
- `ChangeEventEmitter`

## `InputEventEmitter`

Use for immediate value changes.

```ts
private readonly inputEvent = new InputEventEmitter(this);

private onInput(value: string) {
  this.value = value;
  this.inputEvent.emit();
}
```

## `ChangeEventEmitter`

Use for committed value changes.

```ts
private readonly changeEvent = new ChangeEventEmitter(this);

private commit() {
  this.changeEvent.emit();
}
```

## Notes

- Both helpers dispatch native events, not custom ones.
- They are especially useful for form-like custom elements.
