// Documento de proyecto. El contenido se modela con los bloques tipados
// (sanity/schemas/blocks/*) que se corresponden 1:1 con los componentes del
// renderer (src/components/OSProjectRenderer). La query getTree() en
// sanity/sanity-utils.ts traduce estos documentos al mismo shape que usa
// el árbol estático src/resources/tree.js.
const project = {
  name: 'project',
  title: 'Proyectos',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nombre',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug (para enlaces ?open=...)',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'date',
      title: 'Fecha (texto, ej. "January 2025")',
      type: 'string',
    },
    {
      name: 'icon',
      title: 'Icono (ruta /img/icons/... o URL)',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Carpeta',
      type: 'reference',
      to: [{ type: 'folder' }],
    },
    {
      name: 'order',
      title: 'Orden dentro de la carpeta',
      type: 'number',
    },
    {
      name: 'url',
      title: 'URL del proyecto en vivo',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Contenido',
      type: 'array',
      of: [
        { type: 'projectHeader' },
        { type: 'sectionHeader' },
        { type: 'subsectionHeader' },
        { type: 'paragraph' },
        { type: 'techStack' },
        { type: 'projectImages' },
        { type: 'link' },
      ],
    },
    {
      name: 'techStack',
      title: 'Tecnologías (etiquetas)',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'deployment',
      title: 'Despliegue (etiquetas)',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'date', media: 'icon' },
  },
};

export default project;
