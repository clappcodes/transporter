import type { Readable } from "../types.ts";

/**
 * Creates an observable from an `EventTarget`.
 * Each event is turned into an item for the observable.
 *
 * @typeparam K Type of the event target `el`.
 * @typeparam T Type of the events to be emitted, such as `MouseEvent`.
 * @param el Event target to create an observable from.
 * @param name Name of the event to listen to, such as `'click'`.
 * @returns New observable that emits values from the event target.
 */
export function fromEvent<K extends HTMLElement, T extends Event = Event>(
  el: K,
  name: string,
  options?: boolean | AddEventListenerOptions,
): Readable<T> {
  let listener: EventListener;
  return new ReadableStream<T>(
    {
      start(controller) {
        listener = (e) => controller.enqueue(e as T);
        el.addEventListener(name, listener, options);
      },
      cancel() {
        el.removeEventListener(name, listener, options);
      },
    },
    { highWaterMark: 0 },
  );
}
