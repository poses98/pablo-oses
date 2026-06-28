// Bloque de cabecera de sección. Renderiza <SectionHeader> (espera { text }).
const sectionHeader = {
  name: 'sectionHeader',
  title: 'Cabecera de sección',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'Texto',
      type: 'string',
    },
  ],
  preview: {
    select: { title: 'text' },
    prepare({ title }: { title?: string }) {
      return { title: title || 'Cabecera de sección', subtitle: 'Sección' };
    },
  },
};

export default sectionHeader;
