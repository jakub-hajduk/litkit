---
title: Delegate Value
description: Mirror a host property into an internal rendered element.
---

# Delegate Value

This mechanism is marked experimental in the source and should be treated that way in application code.

## Exports

- `DelegateValue`

## `@DelegateValue(selector, targetProperty?, converter?)`

It watches a host property and writes the value into a matching element inside `renderRoot`.

```ts
@property()
@DelegateValue('input', 'value')
value = '';
```

## When to use it

- when the host owns a value but an internal control needs the same value
- when you want to keep proxy code small

## Notes

- The target element is queried after `updateComplete`.
- If no matching element exists, nothing is written.
- Prefer explicit code if the delegation rules are complex.
