var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// utils/DeferredPromise.ts
var DeferredPromise = class extends Promise {
  static {
    __name(this, "DeferredPromise");
  }
  resolved;
  constructor(resolver) {
    const that = {};
    super(function(resolve, reject) {
      Object.assign(that, { resolve, reject });
    });
    Object.assign(this, that);
    if (resolver) {
      resolver(this.resolve, this.reject);
    }
  }
};

// transport/handler.ts
function duplex(handler) {
  const pmap = /* @__PURE__ */ new Map();
  Object.assign(globalThis, { pmap });
  return /* @__PURE__ */ __name(function duplexFetch(request) {
    const id = request.headers.get("duplex-stream");
    if (id && !pmap.has(id)) {
      pmap.set(id, new DeferredPromise());
    }
    if (request.body) {
      console.log(id);
      if (id) {
        Promise.resolve(handler(request)).then(pmap.get(id).resolve);
        return new Promise((resolve, reject) => {
          Object.assign(request, { resolve, reject });
        });
      }
      return handler(request);
    } else if (id) {
      request.signal.addEventListener("abort", (e) => {
        pmap.delete(id);
        console.log("(signal)", request.method, id);
      });
      return pmap.get(id);
    }
    return handler(request);
  }, "duplexFetch");
}
__name(duplex, "duplex");
export {
  duplex
};
//# sourceMappingURL=handler.ts.map
