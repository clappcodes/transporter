var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
class DeferredPromise extends Promise {
  static {
    __name(this, "DeferredPromise");
  }
  resolved = false;
  constructor(resolver) {
    const that = {};
    super(function(resolve, reject) {
      Object.assign(that, {
        resolve: (value) => {
          that.resolved = true;
          console.log("(resolved)", value);
          return resolve(value);
        },
        reject
      });
    });
    Object.assign(this, that);
    if (resolver) {
      resolver(this.resolve, this.reject);
    }
  }
}
export {
  DeferredPromise
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vdXRpbHMvRGVmZXJyZWRQcm9taXNlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgY2xhc3MgRGVmZXJyZWRQcm9taXNlPFQ+IGV4dGVuZHMgUHJvbWlzZTxUPiB7XG4gIGRlY2xhcmUgcmVzb2x2ZTogKHZhbHVlOiBUIHwgUHJvbWlzZUxpa2U8VD4pID0+IHZvaWQ7XG4gIGRlY2xhcmUgcmVqZWN0OiAocmVhc29uPzogdW5rbm93bikgPT4gdm9pZDtcbiAgcmVzb2x2ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICByZXNvbHZlcj86IChcbiAgICAgIHJlc29sdmU6ICh2YWx1ZTogVCB8IFByb21pc2VMaWtlPFQ+KSA9PiB2b2lkLFxuICAgICAgcmVqZWN0OiAocmVhc29uPzogdW5rbm93bikgPT4gdm9pZCxcbiAgICApID0+IHZvaWQsXG4gICkge1xuICAgIGNvbnN0IHRoYXQ6IERlZmVycmVkUHJvbWlzZTxUPiA9IHt9IGFzIERlZmVycmVkUHJvbWlzZTxUPjtcblxuICAgIHN1cGVyKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24odGhhdCwge1xuICAgICAgICByZXNvbHZlOiAodmFsdWU6IFQgfCBQcm9taXNlTGlrZTxUPikgPT4ge1xuICAgICAgICAgIHRoYXQucmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiKHJlc29sdmVkKVwiLCB2YWx1ZSk7XG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUodmFsdWUpO1xuICAgICAgICB9LFxuICAgICAgICByZWplY3QsXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgdGhhdCk7XG5cbiAgICBpZiAocmVzb2x2ZXIpIHtcbiAgICAgIHJlc29sdmVyKHRoaXMucmVzb2x2ZSwgdGhpcy5yZWplY3QpO1xuICAgIH1cbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7QUFBTyxNQUFNLHdCQUEyQixRQUFXO0FBQUEsRUFBbkQsT0FBbUQ7QUFBQTtBQUFBO0FBQUEsRUFHakQsV0FBb0I7QUFBQSxFQUVwQixZQUNFLFVBSUE7QUFDQSxVQUFNLE9BQTJCLENBQUM7QUFFbEMsVUFBTSxTQUFVLFNBQVMsUUFBUTtBQUMvQixhQUFPLE9BQU8sTUFBTTtBQUFBLFFBQ2xCLFNBQVMsQ0FBQyxVQUE4QjtBQUN0QyxlQUFLLFdBQVc7QUFDaEIsa0JBQVEsSUFBSSxjQUFjLEtBQUs7QUFDL0IsaUJBQU8sUUFBUSxLQUFLO0FBQUEsUUFDdEI7QUFBQSxRQUNBO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSCxDQUFDO0FBRUQsV0FBTyxPQUFPLE1BQU0sSUFBSTtBQUV4QixRQUFJLFVBQVU7QUFDWixlQUFTLEtBQUssU0FBUyxLQUFLLE1BQU07QUFBQSxJQUNwQztBQUFBLEVBQ0Y7QUFDRjsiLAogICJuYW1lcyI6IFtdCn0K
