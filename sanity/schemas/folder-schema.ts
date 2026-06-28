// Documento de carpeta (categoría de primer nivel del escritorio), p. ej.
// "Web Applications" o "Side Projects". Los proyectos se asocian a una carpeta
// mediante el campo `category`. getTree() agrupa los proyectos bajo su carpeta
// reproduciendo el shape { name, type: 'folder', route, content: [...] }.
const folder = {
  name: 'folder',
  title: 'Carpetas',
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
      name: 'icon',
      title: 'Icono (ruta /img/... o URL, opcional)',
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

export default folder;
