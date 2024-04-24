export default function printHandler(request: Request): Response {
  console.log(request);
  return new Response(JSON.stringify(request, null, 4));
}
