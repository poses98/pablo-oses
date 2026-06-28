// Tarjeta de tecnología individual, usada dentro del bloque techStack.
// Se renderiza como <StackCard tech text /> (a través de <TechStack>).
const techCard = {
  name: 'techCard',
  title: 'Tarjeta de tecnología',
  type: 'object',
  fields: [
    {
      name: 'tech',
      title: 'Tecnología',
      type: 'string',
    },
    {
      name: 'text',
      title: 'Descripción',
      type: 'text',
      rows: 3,
    },
  ],
  preview: {
    select: { title: 'tech', subtitle: 'text' },
  },
};

export default techCard;
