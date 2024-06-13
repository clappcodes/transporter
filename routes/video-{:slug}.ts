function tapp<T extends TApp.Serve>(serve: T): T;
function tapp<T extends TApp.Handler>(fetch: T): T;
function tapp<
  E extends {},
  T extends ((this: E, request: TApp.Request) => ReturnType<TApp.Handler>),
>(ext: E, fetch: T): E & { fetch: T };

function tapp<
  E extends {},
  T extends TApp.Serve & {
    fetch: (this: E, request: TApp.Request) => ReturnType<TApp.Handler>;
  },
>(ext: E, serve: T): E & T;

function tapp(input: TApp.Serve | TApp.Handler, ext?: {}) {
  if (typeof input === "function") {
    return Object.assign({ fetch: input }, ext);
  }

  return Object.assign(input, ext);
}

const app = tapp(
  {
    async *gen() {
      const interval = 500;
      const start = 0;
      const end = 10;

      for (let i = start; i <= end; i++) {
        await new Promise((resolve) => setTimeout(resolve, interval));

        yield `data: Message #${i}\n\n`;
      }
    },
  },
  {
    fetch(req) {
      req.context.responseInit = {
        headers: {
          "content-type": "text/event-stream",
        },
      };
      console.log({ that: this });
      return this.gen();
    },
  },
);

// console.log(app);

export default tapp({ f: [1] }, {
  xxx: "xxx",
  fetch: function f1() {
    return this.f;
  },
});
