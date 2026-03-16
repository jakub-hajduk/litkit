---
title: Why litkit
description: Why the package exists and what problems it is meant to remove from Lit components.
---

# Why litkit

Lit components are usually pleasant to write until the same infrastructure starts showing up in every component:

- reflect a property into ARIA state
- observe a slot and keep a property in sync
- attach and remove listeners correctly
- dispatch `input` and `change` for custom controls
- manage roving tabindex for composite widgets

None of these problems are individually large. Together, they create a lot of repeated code.

`litkit` exists to standardize those patterns without hiding Lit itself.

## What it optimizes for

### Small building blocks

Each mechanism is narrow. You can adopt only what a component needs.

### Lit-first design

The package uses Lit concepts directly:

- decorators
- reactive controllers
- `ElementInternals`
- `updateComplete`
- slot projection

It does not replace the Lit lifecycle. It works with it.

### Progressive complexity

Most features come in two forms:

- a controller for imperative control
- decorators built on top for the common case

That lets you start simple and drop down a level only when a component gets more complex.

## Where it helps most

`litkit` adds the most value when you are building:

- design-system primitives
- form-associated custom elements
- listbox, tabs, menu, and option patterns
- components that consume light DOM
- components with accessibility behavior on the host

## Where it is intentionally light

`litkit` does not try to be:

- a state management layer
- a rendering abstraction
- a router
- a form library
- a design system

It stays close to component authoring concerns.
