// Documento de página de texto (markdown), p. ej. "Who Am I".
// getTree() lo emite como un nodo { name, type: 'text', route, content } donde
// content es el string markdown que renderiza <OSNotepad>.
const textPage = {
  name: 'textPage',
  title: 'Páginas de texto',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nombre',
      type: 'string',
    },
    {
      name: 'route',
      title: 'Ruta (slug)',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'markdown',
      title: 'Contenido (markdown)',
      type: 'text',
      rows: 12,
    },
    {
      name: 'order',
      title: 'Orden en el escritorio',
      type: 'number',
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'route.current' },
  },
};

export default textPage;
