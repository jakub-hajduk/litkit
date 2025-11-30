import { LitElement } from 'lit'

export type LitConstructor = new (...args: any[]) => LitElement;
export type Constructor<T> = new (...args: any[]) => T;
