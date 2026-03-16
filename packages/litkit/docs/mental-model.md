---
title: Mental Model
description: A practical way to think about litkit while building Lit components.
---

# Mental Model

The easiest way to understand `litkit` is to split it into four layers.

## Layer 1: Host semantics

Use these when the host element itself should expose state or accessibility meaning:

- `@Role`
- `@Aria`
- `@CSSState`
- `ensureInternals`

This layer is about the contract of the custom element as seen from outside.

## Layer 2: Reactive observation

Use these when your component needs to react to changes:

- `HostUpdateController`
- `SlotChangeController`
- `@SlotChange`
- `@SlottedNodes`
- `@SlottedElements`
- `@SlottedText`

This layer turns incoming values, properties, and slots into reactive inputs.

## Layer 3: Interaction wiring

Use these when user interaction needs consistent event handling:

- `@Listen`
- `@ListenKeys`
- `@Action`
- `@Command`
- `HostEventListenerController`

This layer centralizes event lifecycle and reduces attach/detach noise.

## Layer 4: Communication and navigation

Use these when the component has to communicate outward or manage composite focus:

- `CustomEventEmitter`
- `InputEventEmitter`
- `ChangeEventEmitter`
- `RovingTabindexController`
- focus strategies

This layer handles outward events and internal keyboard navigation.

## Rule of thumb

When you build with `litkit`, prefer this order:

1. Write a normal Lit component first.
2. Add decorators for the stable patterns.
3. Add controllers only when the decorators are not enough.
4. Use low-level helpers only when you are building your own abstractions.

## Root import vs subpath import

Both are valid. Pick the one that matches how you want the docs and code to read.

```ts
import { SlotChange, SlottedElements } from 'litkit';
```

```ts
import { SlotChange, SlottedElements } from 'litkit/slots';
```

If a component uses a clearly defined feature area, subpath imports often make the codebase easier to scan.
