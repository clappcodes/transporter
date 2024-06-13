import { duplex } from "../transport.ts";
var app_default = {
  fetch: duplex((request) => {
    return new Response(
      JSON.stringify(
        Object.keys(Request.prototype).reduce(
          // @ts-ignore .
          (acc, key) => {
            acc[key] = key === "headers" ? Object.fromEntries(request[key].entries()) : request[key];
            return acc;
          },
          {}
        ),
        null,
        4
      )
    );
  })
};
export {
  app_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vYXBwL2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBkdXBsZXggfSBmcm9tIFwiLi4vdHJhbnNwb3J0LnRzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZmV0Y2g6IGR1cGxleCgocmVxdWVzdCkgPT4ge1xuICAgIHJldHVybiBuZXcgUmVzcG9uc2UoXG4gICAgICBKU09OLnN0cmluZ2lmeShcbiAgICAgICAgT2JqZWN0LmtleXMoUmVxdWVzdC5wcm90b3R5cGUpLnJlZHVjZTx7IFtQIGluIGtleW9mIFJlcXVlc3RdOiBhbnkgfT4oXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZSAuXG4gICAgICAgICAgKGFjYywga2V5OiBrZXlvZiBSZXF1ZXN0KSA9PiB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlIC5cbiAgICAgICAgICAgIGFjY1trZXldID0ga2V5ID09PSBcImhlYWRlcnNcIlxuICAgICAgICAgICAgICA/IE9iamVjdC5mcm9tRW50cmllcyhyZXF1ZXN0W2tleV0uZW50cmllcygpKVxuICAgICAgICAgICAgICA6IHJlcXVlc3Rba2V5XTtcbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgfSxcbiAgICAgICAgICB7fSBhcyB7IFtQIGluIGtleW9mIFJlcXVlc3RdOiBhbnkgfSxcbiAgICAgICAgKSxcbiAgICAgICAgbnVsbCxcbiAgICAgICAgNCxcbiAgICAgICksXG4gICAgKTtcbiAgfSksXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIkFBQUEsU0FBUyxjQUFjO0FBRXZCLElBQU8sY0FBUTtBQUFBLEVBQ2IsT0FBTyxPQUFPLENBQUMsWUFBWTtBQUN6QixXQUFPLElBQUk7QUFBQSxNQUNULEtBQUs7QUFBQSxRQUNILE9BQU8sS0FBSyxRQUFRLFNBQVMsRUFBRTtBQUFBO0FBQUEsVUFFN0IsQ0FBQyxLQUFLLFFBQXVCO0FBRTNCLGdCQUFJLEdBQUcsSUFBSSxRQUFRLFlBQ2YsT0FBTyxZQUFZLFFBQVEsR0FBRyxFQUFFLFFBQVEsQ0FBQyxJQUN6QyxRQUFRLEdBQUc7QUFDZixtQkFBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBLENBQUM7QUFBQSxRQUNIO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUNIOyIsCiAgIm5hbWVzIjogW10KfQo=
