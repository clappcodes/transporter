export class XResponse<
  X extends BodyInit,
  I extends ResponseInit,
> extends Response {
  constructor(body: X, init?: I) {
    super(
      readable.from(body).pipeThrough(
        transform.toUint8Array(),
      ),
      init,
    );
  }
  [Symbol.for("Deno.customInspect")](
    inspect: (value: unknown) => string,
  ): string {
    const { body, headers } = this;
    return `${this.constructor.name} ${inspect({ body, headers })}`;
  }
}
