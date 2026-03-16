---
title: Slots
description: React to slotted content and project light DOM into component state.
---

# Slots

This mechanism turns slot content into reactive component input.

## Exports

- `SlotChangeController`
- `SlotChange`
- `SlottedNodes`
- `SlottedElements`
- `SlottedElementsOfType`
- `SlottedText`
- slot-related types

## `SlotChangeController`

Use the controller when you want direct subscription logic.

```ts
private readonly slots = new SlotChangeController(this);

constructor() {
  super();
  this.slots.subscribe(null, (nodes, slot) => {
    console.log(nodes, slot);
  });
}
```

## `@SlotChange(slotName?)`

Use when you just need a callback on slot updates.

```ts
@SlotChange()
private onSlotChange(nodes: Node[], slot: HTMLSlotElement) {
  // ...
}
```

## `@SlottedNodes(slotName?, filter?)`

Syncs a property with the assigned nodes of a slot.

```ts
@SlottedNodes()
nodes: Node[] = [];
```

## `@SlottedElements(slotName?)`

Syncs a property with the element nodes in a slot.

```ts
@SlottedElements()
items: Element[] = [];
```

## `@SlottedElementsOfType(slotName, types)`

Filters slot content to specific component or element classes.

```ts
@SlottedElementsOfType(null, [MyOption])
options: MyOption[] = [];
```

## `@SlottedText(slotName?, isFallback?)`

Collects text content from assigned nodes.

```ts
@SlottedText()
label = '';
```

## Notes

- The controller waits until the component has rendered before it scans slots.
- `SlottedText` has a fallback-oriented default mode. Pass `false` as the second argument if you want updates on every slot text change.
