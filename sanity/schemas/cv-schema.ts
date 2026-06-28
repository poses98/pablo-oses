// Documento singleton del Curriculum Vitae. getTree() lo emite como un nodo
// { name, type: 'pdf', route, content } donde content es la URL del PDF que
// renderiza <OSPdfRenderer>. El PDF puede subirse como archivo a Sanity (file)
// o referenciarse por ruta estática (/pdf/...) con el campo url.
const cv = {
  name: 'cv',
  title: 'Curriculum Vitae',
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
      name: 'file',
      title: 'Archivo PDF (subido a Sanity)',
      type: 'file',
      options: { accept: 'application/pdf' },
    },
    {
      name: 'url',
      title: 'O ruta estática del PDF (/pdf/...)',
      type: 'string',
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

export default cv;
