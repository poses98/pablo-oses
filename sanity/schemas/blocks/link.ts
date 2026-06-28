// Bloque de enlace / botón de acción. Renderiza <ActionButton> (espera { url }).
const link = {
  name: 'link',
  title: 'Enlace (botón)',
  type: 'object',
  fields: [
    {
      name: 'url',
      title: 'URL',
      type: 'url',
    },
    {
      name: 'label',
      title: 'Texto del botón (opcional)',
      type: 'string',
    },
  ],
  preview: {
    select: { title: 'url' },
    prepare({ title }: { title?: string }) {
      return { title: title || 'Enlace', subtitle: 'Botón de acción' };
    },
  },
};

export default link;
