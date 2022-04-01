import { PAGE_ROUTER } from "./types";

export function location(href, pathname) {
  const location = {
    href,
    pathname,
  };

  return {
    type: PAGE_ROUTER,
    payload: location,
  };
}
