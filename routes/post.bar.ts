export default {
  fetch: () => readable.fromTimer(500, Date.now),
} as TApp.Serve;
