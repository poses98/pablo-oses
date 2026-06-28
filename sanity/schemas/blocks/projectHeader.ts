// Bloque de cabecera de proyecto. Renderiza el componente <ProjectHeader>
// (src/components/OSProjectRenderer/ProjectHeader/ProjectHeader.js), que espera
// las props { text, logo, date }.
const projectHeader = {
  name: 'projectHeader',
  title: 'Cabecera de proyecto',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'Título',
      type: 'string',
    },
    {
      name: 'logo',
      title: 'Logo (ruta /img/... o URL)',
      type: 'string',
    },
    {
      name: 'date',
      title: 'Fecha',
      type: 'string',
    },
  ],
  preview: {
    select: { title: 'text', subtitle: 'date' },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return { title: title || 'Cabecera de proyecto', subtitle: `Cabecera · ${subtitle || ''}` };
    },
  },
};

export default projectHeader;
