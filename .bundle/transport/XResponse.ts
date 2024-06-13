var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
class XResponse extends Response {
  static {
    __name(this, "XResponse");
  }
  constructor(body, init) {
    super(
      readable.from(body).pipeThrough(
        transform.toUint8Array()
      ),
      init
    );
  }
  [Symbol.for("Deno.customInspect")](inspect) {
    const { body, headers } = this;
    return `${this.constructor.name} ${inspect({ body, headers })}`;
  }
}
export {
  XResponse
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vdHJhbnNwb3J0L1hSZXNwb25zZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGNsYXNzIFhSZXNwb25zZTxcbiAgWCBleHRlbmRzIEJvZHlJbml0LFxuICBJIGV4dGVuZHMgUmVzcG9uc2VJbml0LFxuPiBleHRlbmRzIFJlc3BvbnNlIHtcbiAgY29uc3RydWN0b3IoYm9keTogWCwgaW5pdD86IEkpIHtcbiAgICBzdXBlcihcbiAgICAgIHJlYWRhYmxlLmZyb20oYm9keSkucGlwZVRocm91Z2goXG4gICAgICAgIHRyYW5zZm9ybS50b1VpbnQ4QXJyYXkoKSxcbiAgICAgICksXG4gICAgICBpbml0LFxuICAgICk7XG4gIH1cbiAgW1N5bWJvbC5mb3IoXCJEZW5vLmN1c3RvbUluc3BlY3RcIildKFxuICAgIGluc3BlY3Q6ICh2YWx1ZTogdW5rbm93bikgPT4gc3RyaW5nLFxuICApOiBzdHJpbmcge1xuICAgIGNvbnN0IHsgYm9keSwgaGVhZGVycyB9ID0gdGhpcztcbiAgICByZXR1cm4gYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSAke2luc3BlY3QoeyBib2R5LCBoZWFkZXJzIH0pfWA7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7O0FBQU8sTUFBTSxrQkFHSCxTQUFTO0FBQUEsRUFIbkIsT0FHbUI7QUFBQTtBQUFBO0FBQUEsRUFDakIsWUFBWSxNQUFTLE1BQVU7QUFDN0I7QUFBQSxNQUNFLFNBQVMsS0FBSyxJQUFJLEVBQUU7QUFBQSxRQUNsQixVQUFVLGFBQWE7QUFBQSxNQUN6QjtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsQ0FBQyxPQUFPLElBQUksb0JBQW9CLENBQUMsRUFDL0IsU0FDUTtBQUNSLFVBQU0sRUFBRSxNQUFNLFFBQVEsSUFBSTtBQUMxQixXQUFPLEdBQUcsS0FBSyxZQUFZLElBQUksSUFBSSxRQUFRLEVBQUUsTUFBTSxRQUFRLENBQUMsQ0FBQztBQUFBLEVBQy9EO0FBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
