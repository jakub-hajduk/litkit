import { LitElement, ReactiveElement } from 'lit'
import { ensureInternals, Internals } from '../internals'
import type { AriaRole } from './types'

export function Role(role: AriaRole): ClassDecorator {
  return function <ElementClass extends typeof LitElement>(
    constructor: ElementClass
  ) {

    constructor.addInitializer((instance: ReactiveElement & { [Internals]?: ElementInternals; }) => {
      const internals = (instance[Internals] ??=
        ensureInternals(instance));

      internals.role = role as string;
    })
  } as ClassDecorator;
}
