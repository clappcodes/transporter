export default {
  fetch(req) {
    req.context.responseInit.headers = {
      "content-type": "text/html",
    };

    return `
        <h1>Deep route ${req.url}</h1>
        <pre>${JSON.stringify(req, null, 4)}</pre>
    `;
  },
} as TApp.Serve;
