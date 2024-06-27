export const mergePath = (...paths: string[]): string => {
  let p: string = "";
  let endsWithSlash = false;

  for (let path of paths) {
    /* ['/hey/','/say'] => ['/hey', '/say'] */
    if (p[p.length - 1] === "/") {
      p = p.slice(0, -1);
      endsWithSlash = true;
    }

    /* ['/hey','say'] => ['/hey', '/say'] */
    if (path[0] !== "/") {
      path = `/${path}`;
    }

    /* ['/hey/', '/'] => `/hey/` */
    if (path === "/" && endsWithSlash) {
      p = `${p}/`;
    } else if (path !== "/") {
      p = `${p}${path}`;
    }

    /* ['/', '/'] => `/` */
    if (path === "/" && p === "") {
      p = "/";
    }
  }

  return p;
};
