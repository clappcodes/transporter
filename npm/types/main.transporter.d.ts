import "./shims.js";
import { DeferredPromise } from "./utils.js";
export declare class OutgoingStream<I = any, O extends Uint8Array = Uint8Array> {
    #private;
    static idx: number;
    static set: Set<OutgoingStream<any, Uint8Array>>;
    static add: (instance: OutgoingStream) => Set<OutgoingStream<any, Uint8Array>>;
    static del: (instance: OutgoingStream) => boolean;
    static get: (obj: {
        idx?: number;
        id?: string;
    }) => OutgoingStream<any, Uint8Array>[];
    ready: Promise<this>;
    closed: DeferredPromise<unknown>;
    static get size(): number;
    idx: number;
    id: string;
    readable: ReadableStream<Uint8Array>;
    static write<T>(chunk: T): void;
    controller: ReadableStreamDefaultController<I>;
    headers: Headers;
    name: string;
    url: URL;
    env: "client" | "server";
    constructor(url: URL | string | Request, transform?: TransformStream<I, O>);
    get writable(): WritableStream<I>;
    write(chunk: I): Promise<void>;
    close(): void;
    fetch(): Promise<this>;
    handle(_request: Request): Promise<this>;
    response(headers?: HeadersInit): Promise<Response>;
}
export declare class IncomingStream<I extends Uint8Array = Uint8Array, O = any> {
    private transform;
    static idx: number;
    idx: number;
    id: string;
    headers: Headers;
    readable: ReadableStream<O>;
    ready: Promise<this>;
    closed: DeferredPromise<unknown>;
    name: string;
    url: URL;
    env: "server" | "client";
    constructor(url: string | URL | Request, transform?: TransformStream<I, O>);
    [Symbol.asyncIterator](): AsyncGenerator<Awaited<O>, void, unknown>;
    fetch(): Promise<this>;
    handle(request: Request): Promise<this>;
    response(headers?: HeadersInit): Promise<Response>;
}
