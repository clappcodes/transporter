import { duplex } from "../transport/mod.ts";

export default {
  fetch: duplex((request) => {
    return new Response(
      JSON.stringify(
        Object.keys(Request.prototype).reduce<{ [P in keyof Request]: any }>(
          // @ts-ignore .
          (acc, key: keyof Request) => {
            // @ts-ignore .
            acc[key] = key === "headers"
              ? Object.fromEntries(request[key].entries())
              : request[key];
            return acc;
          },
          {} as { [P in keyof Request]: any },
        ),
        null,
        4,
      ),
    );
  }),
};
