import { bold, gray, red } from "./colors.ts";
import * as transporter from "./mod.ts";

import type * as TransportTypes from "./transport/types.ts";

import pipe1 from "./playground/pipe1.ts";

Object.assign(globalThis, { pipe1 });

console.log(
  "\n\t" +
    bold(red(transporter.package.name)) + " " +
    gray(transporter.package.version) + "\n\n",
);

// const table = {
//   readable: Object.keys(transporter.readable),
//   writable: Object.keys(transporter.writable),
//   transform: Object.keys(transporter.transform),
// };

// console.log(table);

const {
  Route,
  Router,
  App,
  tapp,
  fetchDuplex,
  fetchStream,
  get,
  send,
  put,
  post,
  duplex,
  ess,
  TransportStream,
  Transporter,
  TextTransporter,
  EventSourceTransporter,
  JSONTransporter,
  RequestDuplex,
  RequestStream,
  PipeStream,
} = transporter.transport;

Object.assign(globalThis, transporter, ess, {
  TransportStream,
  PipeStream,
  Transporter,
  TextTransporter,
  EventSourceTransporter,
  JSONTransporter,
  RequestDuplex,
  RequestStream,
  transporter,
  readable: Object.assign(transporter.readable.readable, transporter.readable),
  Route,
  ess,
  Router,
  App,
  tapp,
  fetchDuplex,
  fetchStream,
  duplex,
  get,
  send,
  put,
  post,
});

declare global {
  const readable: typeof transporter.readable;
  const writable: typeof transporter.writable;
  const transform: typeof transporter.transform;
  const transport: typeof transporter.transport;
  class Transporter extends transporter.transport.Transporter {}
  // const tapp: typeof transport.tapp;

  // const Transporter: typeof transporter;
  // type Transporter = typeof transporter;

  // type Transport = typeof transporter.transport

  // namespace Transporter {
  //   const readable: typeof transporter.readable;
  //   const writable: typeof transporter.writable;
  //   const transform: typeof transporter.transform;
  //   const transport: typeof transporter.transport;
  // }

  namespace TApp {
    interface Serve extends TransportTypes.Serve {}
    interface Request extends TransportTypes.Request {
      params: Record<string, string | undefined>;
    }
    interface Context extends TransportTypes.Context {}
    interface Handler extends TransportTypes.ServeHandler {}
  }
}

export {};
