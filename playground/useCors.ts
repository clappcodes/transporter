export function useCors(response: Response) {
  response.headers.set("cache-control", "no-cache");
  response.headers.set("access-control-allow-origin", "*");
  response.headers.set("access-control-allow-methods", "*");
  response.headers.set("access-control-allow-headers", "*");
  response.headers.set("access-control-max-age", "100");

  return response;
}
