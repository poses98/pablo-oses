// Bloque de stack tecnológico. Renderiza <TechStack> (espera { stack: [{ tech, text }] }).
const techStack = {
  name: 'techStack',
  title: 'Stack tecnológico',
  type: 'object',
  fields: [
    {
      name: 'stack',
      title: 'Tarjetas',
      type: 'array',
      of: [{ type: 'techCard' }],
    },
  ],
  preview: {
    select: { stack: 'stack' },
    prepare({ stack }: { stack?: unknown[] }) {
      const count = Array.isArray(stack) ? stack.length : 0;
      return { title: 'Stack tecnológico', subtitle: `${count} tecnología(s)` };
    },
  },
};

export default techStack;
