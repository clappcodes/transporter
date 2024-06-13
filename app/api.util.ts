import { RequestMethod } from "../transport/types.ts";
import { createRequest } from "../transport/api.ts";

type CTX<I> = Context<I> & I;

class Context<I = {}> {
  assign<T>(obj: T) {
    return Object.assign(this, obj);
  }
  static assign<T>(obj: T) {
    return new this().assign(obj);
  }
}

const context = <I>(init: I) => new Context<I>().assign(init);

const def = <F extends <C extends Context>(ctx: C) => unknown>(fn: F) => fn;
const def2 = <F extends (ctx: Context) => any>(fn: F) => fn;

const a = def((ctx) => ctx.assign({ a: 1, m: ctx }));
const b = def((ctx) => ctx.assign({ b: 1 }));
const c = def((ctx) => Object.assign(ctx, { c: "sssd" }));

interface Server {
  fetch(request: Request, context?: any): Response | Promise<Response>;
  match(request: Request): null | {};
}

const handle = <
  M extends (req: Request) => any,
  F extends (req: Request, ctx: NonNullable<ReturnType<M>>) => Response,
>(m: M, f: F, x: Server["fetch"]) => {
  return (request: Request) => {
    const _m = m(request);
    return _m ? f(request, _m) : x(request);
  };
};

export default {
  fetch: handle(
    (req) =>
      new URLPattern({
        pathname: "/foo/:id",
      }).exec(req.url)?.pathname.groups as { id: string },
    (req, ctx) => new Response("Hello " + req.url + " " + ctx.id),
    (req) => new Response("Not Found " + req.url, { status: 404 }),
  ),
};
