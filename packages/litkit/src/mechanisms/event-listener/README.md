---
title: Event Listener
description: Lifecycle-aware event decorators and a controller for Lit components.
---

# Event Listener

This mechanism centralizes DOM event wiring and cleanup.

## Exports

- `Listen`
- `ListenKeys`
- `Action`
- `Command`
- `HostEventListenerController`
- `detachableEvent`
- related event types

## `@Listen(eventName, options?)`

Registers the method as an event listener and attaches or detaches it with the component lifecycle.

```ts
@Listen('click')
private onClick(event: Event) {
  // ...
}
```

## `@ListenKeys(eventName, keys, options?)`

Only invokes the method for specific keyboard codes.

```ts
@ListenKeys('keydown', ['Escape'])
private onEscape() {
  this.open = false;
}
```

## `@Action()`

Wires one method to click, touch activation, and keyboard activation through `Space` and `Enter`.

```ts
@Action()
private activate() {
  this.selected = true;
}
```

## `@Command(commandName)`

Filters `command` events by invoker command name.

```ts
@Command('close')
private onCloseCommand(event: CommandEvent) {
  this.open = false;
}
```

## `HostEventListenerController`

Use the controller directly when listener registration must be conditional or dynamic.

```ts
private readonly listeners = new HostEventListenerController(this);

constructor() {
  super();
  this.listeners.registerListener('keydown', this.onKeydown.bind(this));
}
```

## Notes

- The controller stores detachable listeners and reattaches them on reconnect.
- `options.element` can point at a specific target element when needed.
