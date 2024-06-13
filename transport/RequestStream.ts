import { STREAM_TYPE, STREAM_TYPE_KEY } from "./handle.ts";
import { JSONTransporter } from "./JSONTransporter.ts";
import { PipeStream } from "./PipeStream.ts";
import { pipeTo } from "./pipeTo.ts";
import { RequestDuplex, type RequestDuplexInit } from "./RequestDuplex.ts";

/**
 * Represents a request stream that extends the RequestDuplex class.
 */
export class RequestStream {
    static fetch = (
        ...args: [
            input: string | URL | Request,
            init?: RequestInit,
        ]
    ) => globalThis.fetch(...args);

    outgoing: RequestDuplex;
    incoming: RequestDuplex | undefined;
    response: Response | undefined;

    /**
     * Fetches the request stream.
     * @param init - Optional request initialization options.
     * @returns A Promise that resolves to the response of the request.
     */
    async fetch(init?: RequestInit): Promise<Response> {
        if (this.incoming) {
            // Duplex
            // >> send stream.
            RequestStream.fetch(this.outgoing, init);
            // << receive stream.
            this.response = await RequestStream.fetch(this.incoming, init);
        } else {
            // << receive stream.
            this.response = await RequestStream.fetch(this.outgoing, init);
        }

        return this.response;
    }

    /**
     * Creates a new instance of RequestStream.
     * @param input - The URL or Request object.
     * @param init - Optional request initialization options.
     */
    constructor(input: URL | RequestInfo, init?: RequestDuplexInit) {
        this.outgoing = new RequestDuplex(input, init);
        this.incoming = this.outgoing.duplex === "half"
            ? new RequestDuplex(this.outgoing.url, {
                method: this.outgoing.method,
                headers: {
                    ...Object.fromEntries(this.outgoing.headers.entries()),
                    [STREAM_TYPE_KEY]: STREAM_TYPE.RESPONSE,
                },
            })
            : undefined;
    }

    static demo = requestStreamDemo;
}

export async function requestStreamDemo() {
    const enc = JSONTransporter.encoder();
    const dec = JSONTransporter.decoder();
    const req = new RequestStream("/pipe1", {
        body: enc.readable,
        method: "put",
    });

    await req.fetch();
    req.response?.body?.pipeTo(dec.writable);

    const api = {
        // request/response
        outgoing: req.outgoing,
        incoming: req.incoming,
        response: req.response,
        // streams
        writable: enc.writable,
        readable: dec.readable,
        // methods
        write: enc.write.bind(enc),
        read: dec.read.bind(dec),
    };

    // api.read(console.log)
    // api.write({ uid: 'xxx', msg: 'Iaka asa' })

    // or

    readable.consume(
        readable.of("foo", "bar", "baz")
            .pipeThrough(
                new PipeStream(
                    transform.map((msg) => ({ uid: "xxx", msg })),
                    api,
                ),
            ),
        console.log,
    );

    return api;
}
