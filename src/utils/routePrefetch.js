const routeImporters = {
  '/': () => import('../pages/Home'),
  '/about': () => import('../pages/About'),
  '/rooms': () => import('../pages/Rooms'),
  '/events': () => import('../pages/Events'),
  '/gallery': () => import('../pages/Gallery'),
  '/contact': () => import('../pages/Contact'),
};

const prefetched = new Set();

export function prefetchRoute(path) {
  const normalized = path.startsWith('/rooms/') ? '/rooms' : path;
  if (prefetched.has(normalized)) return;

  const importer = routeImporters[normalized];
  if (importer) {
    prefetched.add(normalized);
    importer().catch(() => {
      prefetched.delete(normalized);
    });
  }

  if (path.startsWith('/rooms/') && !prefetched.has('room-detail')) {
    prefetched.add('room-detail');
    import('../pages/RoomDetail').catch(() => {
      prefetched.delete('room-detail');
    });
  }
}
