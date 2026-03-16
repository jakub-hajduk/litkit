---
title: Update
description: React to Lit property changes with a shared controller.
---

# Update

This mechanism wraps Lit property change observation in a controller-friendly API.

## Exports

- `HostUpdateController`
- `ensureHostUpdateController`
- update handler types

## `HostUpdateController`

```ts
private readonly updates = new HostUpdateController(this);

constructor() {
  super();
  this.updates.watch('value', (newValue, oldValue) => {
    console.log({ newValue, oldValue });
  });
}
```

## When to use it

- when multiple behaviors need to react to the same property
- when you want property-level watchers outside `updated(...)`
- when you are building your own decorators

## Notes

- `watch()` invokes the handler immediately with the current value.
- Later calls happen when Lit reports the property as changed.
- `ensureHostUpdateController()` returns a shared controller instance for the host.
