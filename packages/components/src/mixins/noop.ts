type Constructor<T = {}> = new (...args: any[]) => T;

export function NoopMixin<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
  };
}
