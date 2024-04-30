import * as ows from "npm:observables-with-streams";

export function main() {
  Object.assign(window, { ows });

  //   const log = ows.tap(console.log)

  ows
    .merge(
      ows.fromGenerator(function* () {
        yield 100;
        yield 200;
      }),
      ows
        .fromEvent(document.querySelector("#dec")!, "click")
        .pipeThrough(ows.map(() => -1)),
      ows
        .fromEvent(document.querySelector("#inc")!, "click")
        .pipeThrough(ows.map(() => 1)),
    )
    .pipeThrough(ows.scan((v0, v1) => v0 + v1, 0))
    .pipeThrough(new TransformStream<number, string>())
    .pipeTo(
      ows.subscribe((
        v,
      ) => (document.querySelector("#counter")!.textContent = v)),
    );
}
