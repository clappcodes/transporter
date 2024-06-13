import { Transporter } from "./Transporter.ts";
import {
  EventSourceDecoderStream,
  EventSourceEncoderStream,
  type EventSourceMessage,
} from "./ess/mod.ts";

export class EventSourceTransporter
  extends Transporter<EventSourceMessage, EventSourceMessage> {
  static encoder = () => new EventSourceEncoderStream();
  static decoder = () => new EventSourceDecoderStream();
}

// @ts-ignore .
EventSourceTransporter.demo = (u = "/est-1") => {
  const ts = new EventSourceTransporter(u);

  ts.read(console.log);

  ts.write({ data: "hi es" });

  return ts;
};
