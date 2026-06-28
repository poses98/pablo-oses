// Bloque de galería de imágenes. Renderiza <ImageShowcase>, que espera
// { images: [{ src, width, height, alt }] }.
const showcaseImage = {
  name: 'showcaseImage',
  title: 'Imagen',
  type: 'object',
  fields: [
    {
      name: 'src',
      title: 'Ruta de la imagen (/img/... o URL)',
      type: 'string',
    },
    {
      name: 'width',
      title: 'Ancho (px)',
      type: 'number',
    },
    {
      name: 'height',
      title: 'Alto (px)',
      type: 'number',
    },
    {
      name: 'alt',
      title: 'Texto alternativo',
      type: 'string',
    },
  ],
  preview: {
    select: { title: 'alt', subtitle: 'src' },
  },
};

const projectImages = {
  name: 'projectImages',
  title: 'Galería de imágenes',
  type: 'object',
  fields: [
    {
      name: 'images',
      title: 'Imágenes',
      type: 'array',
      of: [{ type: 'showcaseImage' }],
    },
  ],
  preview: {
    select: { images: 'images' },
    prepare({ images }: { images?: unknown[] }) {
      const count = Array.isArray(images) ? images.length : 0;
      return { title: 'Galería de imágenes', subtitle: `${count} imagen(es)` };
    },
  },
};

export { showcaseImage };
export default projectImages;
