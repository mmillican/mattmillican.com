import { SITE } from '~/config.mjs';

export const getCanonical = (path = ''): string | URL => {
  const url = String(new URL(path, SITE.origin));
  if (SITE.trailingSlash == false && path && url.endsWith('/')) {
    return url.slice(0, -1);
  } else if (SITE.trailingSlash == true && path && !url.endsWith('/')) {
    return `${url}/`;
  }

  return url;
}
