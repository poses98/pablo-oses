// Utilidades para los enlaces profundos del escritorio (?open=<slug>).
// Permiten derivar un slug estable de cada nodo abrible y localizar un nodo en
// el árbol a partir de ese slug, para abrirlo al cargar la página.

export function slugify(str) {
  return String(str || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Slug de un nodo: usa su `route` (proyectos de Sanity, CV, páginas de texto)
// y, si no lo tiene (proyectos del árbol estático), lo deriva del nombre.
export function nodeSlug(node) {
  if (!node) return '';
  if (typeof node.route === 'string' && node.route) return node.route;
  return slugify(node.name);
}

// Tipos de nodo que abren una ventana y, por tanto, son enlazables.
export const OPENABLE_TYPES = ['project', 'pdf', 'text'];

export function isOpenable(node) {
  return !!node && OPENABLE_TYPES.includes(node.type);
}

// Busca recursivamente (dentro de carpetas) el primer nodo abrible cuyo slug
// coincida. Devuelve null si no existe.
export function findNodeBySlug(nodes, slug) {
  if (!Array.isArray(nodes) || !slug) return null;
  for (const node of nodes) {
    if (node.type === 'folder') {
      const found = findNodeBySlug(node.content, slug);
      if (found) return found;
    } else if (isOpenable(node) && nodeSlug(node) === slug) {
      return node;
    }
  }
  return null;
}
