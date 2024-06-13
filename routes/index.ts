export default {
  fetch: function home() {
    return new Response(`Welcome to home`);
  },
} as TApp.Serve;
