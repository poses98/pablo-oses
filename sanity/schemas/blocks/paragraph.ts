// Bloque de párrafo. Renderiza <ProjectParagraph> (espera { text }).
// El texto admite el HTML inline que ya se usa en el contenido actual
// (por ejemplo <br/>) y marcas de negrita estilo markdown (**texto**).
const paragraph = {
  name: 'paragraph',
  title: 'Párrafo',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'Texto',
      type: 'text',
      rows: 5,
      description: 'Admite <br/> para saltos de línea y **texto** para negrita.',
    },
  ],
  preview: {
    select: { title: 'text' },
    prepare({ title }: { title?: string }) {
      return { title: title || 'Párrafo', subtitle: 'Párrafo' };
    },
  },
};

export default paragraph;
