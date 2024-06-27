export * from "./EventSourceMessage.ts";
export * from "./EventSourceDecoderStream.ts";
export * from "./EventSourceEncoderStream.ts";

import { parse } from "./parse.ts";
import { stringify } from "./stringify.ts";

export const ESS = { stringify, parse };
