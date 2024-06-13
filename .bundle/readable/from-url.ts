var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { fromBody } from "./from-body.ts";
async function fromURL(input, init) {
  const request = new Request(input, init);
  const response = await fetch(request);
  return fromBody(response);
}
__name(fromURL, "fromURL");
export {
  fromURL
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhZGFibGUvZnJvbS11cmwudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGZyb21Cb2R5IH0gZnJvbSBcIi4vZnJvbS1ib2R5LnRzXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmcm9tVVJMKFxuICBpbnB1dDogVVJMIHwgUmVxdWVzdEluZm8sXG4gIGluaXQ/OiBSZXF1ZXN0SW5pdCxcbik6IFByb21pc2U8UmVhZGFibGVTdHJlYW08VWludDhBcnJheT4+IHtcbiAgY29uc3QgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGlucHV0LCBpbml0KTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChyZXF1ZXN0KTtcblxuICByZXR1cm4gZnJvbUJvZHkocmVzcG9uc2UpO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7QUFBQSxTQUFTLGdCQUFnQjtBQUV6QixlQUFzQixRQUNwQixPQUNBLE1BQ3FDO0FBQ3JDLFFBQU0sVUFBVSxJQUFJLFFBQVEsT0FBTyxJQUFJO0FBQ3ZDLFFBQU0sV0FBVyxNQUFNLE1BQU0sT0FBTztBQUVwQyxTQUFPLFNBQVMsUUFBUTtBQUMxQjtBQVJzQjsiLAogICJuYW1lcyI6IFtdCn0K
