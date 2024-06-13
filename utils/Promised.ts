export class Promised<T> extends Promise<T> {
  #resolve: (value: T | PromiseLike<T>) => void;
  #reject: (reason?: unknown) => void;

  resolved: boolean = false;
  rejected: boolean = false;

  constructor(
    resolver?: (
      resolve: (value: T | PromiseLike<T>) => void,
      reject: (reason?: unknown) => void,
    ) => void,
  ) {
    const that = Object.create(null) as {
      resolve: (value: T | PromiseLike<T>) => void;
      reject: (reason?: unknown) => void;
    };

    super(function (resolve, reject) {
      Object.assign(that, {
        resolve,
        reject,
      });
    });

    this.#reject = (reason?: unknown) => {
      this.rejected = true;
      that.reject(reason);
    };
    this.#resolve = (value: T | PromiseLike<T>) => {
      this.resolved = true;
      that.resolve(value);
    };

    if (resolver) {
      resolver(this.#resolve, this.#reject);
    }
  }

  resolve<V extends T>(value: V) {
    this.#resolve(value);
  }

  reject(reason?: unknown) {
    this.#reject(reason);
  }

  get state() {
    return promiseState(this);
  }
}

Object.assign(globalThis, { Promised });

export function promiseState<T>(promise: Promise<T>) {
  const pendingState = { status: "pending" };

  return Promise.race([promise, pendingState]).then(
    (value) => value === pendingState ? value : { status: "fulfilled", value },
    (reason) => ({ status: "rejected", reason }),
  );
}
