import { PAGE_LOCATION } from "./types";

export function Location(href, pathname) {
  const payload = {
    href,
    pathname,
  };

  return {
    type: PAGE_LOCATION,
    payload: payload,
  };
}
