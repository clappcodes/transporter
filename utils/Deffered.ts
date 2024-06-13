class Deferred {
  /** @type {Promise<T>} */
  #promise: Promise<T>;
  /** @type {(reject?: any) => void} */
  #reject: (reject?: any) => void;
  /** @type {(value: T | PromiseLike<T>) => void} */
  #resolve: (value: T | PromiseLike<T>) => void;
  /** @type {"pending" | "fulfilled"} */
  #state: "pending" | "fulfilled" = "pending";

  constructor() {
    this.#promise = new Promise((resolve, reject) => {
      this.#resolve = resolve;
      this.#reject = reject;
    });
  }

  /** @returns {Promise<T>} */
  get promise(): Promise<T> {
    return this.#promise;
  }

  /** @returns {"pending" | "fulfilled"} */
  get state(): "pending" | "fulfilled" {
    return this.#state;
  }

  /** @param {any=} reason */
  reject(reason: any | undefined) {
    // already settled promises are a no-op
    if (this.#state !== "pending") {
      return;
    }
    this.#state = "fulfilled";
    this.#reject(reason);
  }

  /** @param {T | PromiseLike<T>} value */
  resolve(value: T | PromiseLike<T>) {
    // already settled promises are a no-op
    if (this.#state !== "pending") {
      return;
    }
    this.#state = "fulfilled";
    this.#resolve(value);
  }
}
