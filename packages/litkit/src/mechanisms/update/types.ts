import type { MaybePromise } from '../../shared/types';

export type Handler<T> = (newValue: T, oldValue: T) => MaybePromise<void>;
