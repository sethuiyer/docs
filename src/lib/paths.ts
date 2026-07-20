export const basePath = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, '');

export function withBase(path = '/') {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalized}`;
}

export function routeFromId(id: string) {
  if (id === 'index') return '/';
  if (id.endsWith('/index')) return `/${id.slice(0, -'/index'.length)}/`;
  return `/${id}/`;
}

export function slugFromRoute(route: string) {
  return route.replace(/^\//, '').replace(/\/$/, '');
}
