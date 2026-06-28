// Bloque de cabecera de subsección. Renderiza <SubsectionHeader> (espera { text }).
const subsectionHeader = {
  name: 'subsectionHeader',
  title: 'Cabecera de subsección',
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
      return { title: title || 'Cabecera de subsección', subtitle: 'Subsección' };
    },
  },
};

export default subsectionHeader;
