---
title: litkit
description: Utility-first building blocks for Lit components.
---

# litkit

`litkit` is a utility package for authoring Lit components with less repetitive wiring. It focuses on the places where component code usually gets noisy:

- accessibility state on the host
- event wiring and cleanup
- slot observation
- keyboard focus management
- property-to-property synchronization
- typed DOM traversal

The package is intentionally small and composable. Most features are either a decorator built on top of a controller, or a simple helper you can adopt without changing your component model.

## Start here

- [Getting Started](./getting-started.md)
- [Why litkit](./why-litkit.md)
- [Mental Model](./mental-model.md)
- [Examples and Recipes](./examples-and-recipes.md)

## Public entrypoints

- `litkit`
- `litkit/css-state`
- `litkit/event-listener`
- `litkit/generic-event-emitters`
- `litkit/internals`
- `litkit/options`
- `litkit/roving-tabindex`
- `litkit/slots`
- `litkit/update`

## Feature guides

These files live next to the implementation so the source and usage guidance stay close together:

- [ARIA](../src/mechanisms/aria/README.md)
- [CSS State](../src/mechanisms/css-state/README.md)
- [Custom Event Emitter](../src/mechanisms/custom-event-emitter/README.md)
- [Delegate Value](../src/mechanisms/delegate-value/README.md)
- [Event Listener](../src/mechanisms/event-listener/README.md)
- [Generic Event Emitters](../src/mechanisms/generic-event-emitters/README.md)
- [Internals](../src/mechanisms/internals/README.md)
- [Options](../src/mechanisms/options/README.md)
- [Roving Tabindex](../src/mechanisms/roving-tabindex/README.md)
- [Slots](../src/mechanisms/slots/README.md)
- [Update](../src/mechanisms/update/README.md)
- [Dropdown](../src/mechanisms/dropdown/README.md)
- [DOM Traversal](../src/dom-traversal/README.md)

## Scope notes

- The exported surface is centered around the files re-exported from [`src/index.ts`](../src/index.ts).
- `dropdown` exists in source but is not exported from the public package entrypoint.
- `flattenNodes` exists in source but is not part of the public export surface.
