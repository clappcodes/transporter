var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
class Promised extends Promise {
  static {
    __name(this, "Promised");
  }
  #resolve;
  #reject;
  constructor(resolver) {
    const that = /* @__PURE__ */ Object.create(null);
    super(function(resolve, reject) {
      Object.assign(that, {
        resolve,
        reject
      });
    });
    this.#reject = that.reject;
    this.#resolve = that.resolve;
    if (resolver) {
      resolver(this.#resolve, this.#reject);
    }
  }
  resolve(value) {
    this.#resolve(value);
  }
  reject(reason) {
    this.#reject(reason);
  }
  get state() {
    return promiseState(this);
  }
}
Object.assign(globalThis, { Promised });
function promiseState(promise) {
  const pendingState = { status: "pending" };
  return Promise.race([promise, pendingState]).then(
    (value) => value === pendingState ? value : { status: "fulfilled", value },
    (reason) => ({ status: "rejected", reason })
  );
}
__name(promiseState, "promiseState");
export {
  Promised,
  promiseState
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vdXRpbHMvUHJvbWlzZWQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImV4cG9ydCBjbGFzcyBQcm9taXNlZDxUPiBleHRlbmRzIFByb21pc2U8VD4ge1xuICAjcmVzb2x2ZTogKHZhbHVlOiBUIHwgUHJvbWlzZUxpa2U8VD4pID0+IHZvaWQ7XG4gICNyZWplY3Q6IChyZWFzb24/OiB1bmtub3duKSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHJlc29sdmVyPzogKFxuICAgICAgcmVzb2x2ZTogKHZhbHVlOiBUIHwgUHJvbWlzZUxpa2U8VD4pID0+IHZvaWQsXG4gICAgICByZWplY3Q6IChyZWFzb24/OiB1bmtub3duKSA9PiB2b2lkLFxuICAgICkgPT4gdm9pZCxcbiAgKSB7XG4gICAgY29uc3QgdGhhdCA9IE9iamVjdC5jcmVhdGUobnVsbCkgYXMge1xuICAgICAgcmVzb2x2ZTogKHZhbHVlOiBUIHwgUHJvbWlzZUxpa2U8VD4pID0+IHZvaWQ7XG4gICAgICByZWplY3Q6IChyZWFzb24/OiB1bmtub3duKSA9PiB2b2lkO1xuICAgIH07XG5cbiAgICBzdXBlcihmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBPYmplY3QuYXNzaWduKHRoYXQsIHtcbiAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgcmVqZWN0LFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLiNyZWplY3QgPSB0aGF0LnJlamVjdDtcbiAgICB0aGlzLiNyZXNvbHZlID0gdGhhdC5yZXNvbHZlO1xuXG4gICAgaWYgKHJlc29sdmVyKSB7XG4gICAgICByZXNvbHZlcih0aGlzLiNyZXNvbHZlLCB0aGlzLiNyZWplY3QpO1xuICAgIH1cbiAgfVxuXG4gIHJlc29sdmU8ViBleHRlbmRzIFQ+KHZhbHVlOiBWKSB7XG4gICAgdGhpcy4jcmVzb2x2ZSh2YWx1ZSk7XG4gIH1cblxuICByZWplY3QocmVhc29uPzogdW5rbm93bikge1xuICAgIHRoaXMuI3JlamVjdChyZWFzb24pO1xuICB9XG5cbiAgZ2V0IHN0YXRlKCkge1xuICAgIHJldHVybiBwcm9taXNlU3RhdGUodGhpcyk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihnbG9iYWxUaGlzLCB7IFByb21pc2VkIH0pO1xuXG5leHBvcnQgZnVuY3Rpb24gcHJvbWlzZVN0YXRlPFQ+KHByb21pc2U6IFByb21pc2U8VD4pIHtcbiAgY29uc3QgcGVuZGluZ1N0YXRlID0geyBzdGF0dXM6IFwicGVuZGluZ1wiIH07XG5cbiAgcmV0dXJuIFByb21pc2UucmFjZShbcHJvbWlzZSwgcGVuZGluZ1N0YXRlXSkudGhlbihcbiAgICAodmFsdWUpID0+IHZhbHVlID09PSBwZW5kaW5nU3RhdGUgPyB2YWx1ZSA6IHsgc3RhdHVzOiBcImZ1bGZpbGxlZFwiLCB2YWx1ZSB9LFxuICAgIChyZWFzb24pID0+ICh7IHN0YXR1czogXCJyZWplY3RlZFwiLCByZWFzb24gfSksXG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOztBQUFPLE1BQU0saUJBQW9CLFFBQVc7QUFBQSxFQUE1QyxPQUE0QztBQUFBO0FBQUE7QUFBQSxFQUMxQztBQUFBLEVBQ0E7QUFBQSxFQUVBLFlBQ0UsVUFJQTtBQUNBLFVBQU0sT0FBTyx1QkFBTyxPQUFPLElBQUk7QUFLL0IsVUFBTSxTQUFVLFNBQVMsUUFBUTtBQUMvQixhQUFPLE9BQU8sTUFBTTtBQUFBLFFBQ2xCO0FBQUEsUUFDQTtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUVELFNBQUssVUFBVSxLQUFLO0FBQ3BCLFNBQUssV0FBVyxLQUFLO0FBRXJCLFFBQUksVUFBVTtBQUNaLGVBQVMsS0FBSyxVQUFVLEtBQUssT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUFBLEVBRUEsUUFBcUIsT0FBVTtBQUM3QixTQUFLLFNBQVMsS0FBSztBQUFBLEVBQ3JCO0FBQUEsRUFFQSxPQUFPLFFBQWtCO0FBQ3ZCLFNBQUssUUFBUSxNQUFNO0FBQUEsRUFDckI7QUFBQSxFQUVBLElBQUksUUFBUTtBQUNWLFdBQU8sYUFBYSxJQUFJO0FBQUEsRUFDMUI7QUFDRjtBQUVBLE9BQU8sT0FBTyxZQUFZLEVBQUUsU0FBUyxDQUFDO0FBRS9CLFNBQVMsYUFBZ0IsU0FBcUI7QUFDbkQsUUFBTSxlQUFlLEVBQUUsUUFBUSxVQUFVO0FBRXpDLFNBQU8sUUFBUSxLQUFLLENBQUMsU0FBUyxZQUFZLENBQUMsRUFBRTtBQUFBLElBQzNDLENBQUMsVUFBVSxVQUFVLGVBQWUsUUFBUSxFQUFFLFFBQVEsYUFBYSxNQUFNO0FBQUEsSUFDekUsQ0FBQyxZQUFZLEVBQUUsUUFBUSxZQUFZLE9BQU87QUFBQSxFQUM1QztBQUNGO0FBUGdCOyIsCiAgIm5hbWVzIjogW10KfQo=
