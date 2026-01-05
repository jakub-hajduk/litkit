import type { LitElement } from 'lit';

export type LitConstructor = new (...args: any[]) => LitElement;
export type Constructor<T> = new (...args: any[]) => T;
export type MaybePromise<T> = Promise<T> | T;

/**
 * A function type that defines a converter. A converter function takes a value of any type
 * and transforms it into another value.
 *
 * @param value The new input value from the component's property.
 * @param value The previous input value from the component's property.
 * @returns The transformed value.
 */

export type ConverterFn = (newValue: any, oldValue: any) => any;
