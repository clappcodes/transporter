import "./_dnt.polyfills.js";
import { type IncomingStream, type OutgoingStream } from "./main.transporter.js";
export declare const DEBUG: boolean;
export declare enum ReadyState {
    CONNECTING = 0,
    INCOMING = 1,
    OUTGOING = 2,
    OPEN = 3,
    CLOSED = 4,
    ERRORED = 5
}
export declare function mkRangeIterator(start?: number, end?: number, step?: number): Generator<number, number, unknown>;
export declare function mkRangeAsyncIterator(start?: number, end?: number, delay?: number): AsyncGenerator<unknown, number, unknown>;
export declare class DeferredPromise<T> extends Promise<T> {
    resolve: (value: T) => void;
    reject: (reason?: unknown) => void;
    constructor(resolver?: (resolve: (value: T) => void, reject: (reason?: unknown) => void) => void);
}
export declare function log(_this: IncomingStream | OutgoingStream, method: string, ...value: unknown[]): void;
export declare function getStream(url: URL | string, transform?: TransformStream): Promise<{
    url: URL;
    id: number;
    request: Request;
    response: Response;
    readable: ReadableStream<string>;
}>;
export declare function putStream(url: URL | string, transform?: TransformStream): {
    id: number;
    writable: WritableStream<any>;
    readable: ReadableStream<any>;
    readable1: ReadableStream<any>;
    readable2: ReadableStream<any>;
    headers: Headers;
    request: Request;
    response: Promise<Response>;
    abortController: AbortController;
};
export declare function createRead<T>(readable: ReadableStream<T> | {
    readable: ReadableStream<T>;
}, cb: (chunk: T) => void): Promise<void>;
export declare function createWrite<T>(writable: WritableStream<T> | {
    writable: WritableStream<T>;
}): (chunk: T) => Promise<void>;
export declare const swapObject: <T extends {
    [key: string]: any;
    [key: number]: any;
    [key: symbol]: any;
}>(obj: T) => { [K in keyof T as T[K]]: K; };
export declare const valueFromKeyObject: <T extends {
    [key: string]: any;
    [key: number]: any;
    [key: symbol]: any;
}>(obj: T) => { [K in keyof T]: K; };
