/**
 * Migración del árbol estático src/resources/tree.js a documentos de Sanity.
 *
 * Crea/actualiza (createOrReplace, idempotente) documentos `folder`, `project`,
 * `cv` y `textPage` con _id deterministas, de modo que se puede reejecutar sin
 * duplicar contenido. Los bloques de contenido de cada proyecto se traducen al
 * formato de los object types definidos en sanity/schemas/blocks/*.
 *
 * Uso:
 *   1. Crea un token de escritura en https://www.sanity.io/manage (proyecto
 *      gv7y171m → API → Tokens, permiso Editor).
 *   2. Expórtalo (no lo comitees):  export SANITY_WRITE_TOKEN="sk..."
 *   3. node scripts/migrate-tree-to-sanity.mjs
 */
import { createClient } from '@sanity/client';
import { tree } from '../src/resources/tree.js';

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error(
    'Falta SANITY_WRITE_TOKEN. Expórtalo antes de ejecutar el script.'
  );
  process.exit(1);
}

const client = createClient({
  projectId: 'gv7y171m',
  dataset: 'production',
  apiVersion: '2024-05-06',
  token,
  useCdn: false,
});

function slugify(str) {
  return String(str || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

let keyCounter = 0;
function key() {
  keyCounter += 1;
  return `k${Date.now().toString(36)}${keyCounter}`;
}

// Traduce un bloque del árbol (type PascalCase) al object type de Sanity
// (_type camelCase) con su _key obligatorio para arrays.
function mapBlock(block) {
  switch (block.type) {
    case 'ProjectHeader':
      return {
        _type: 'projectHeader',
        _key: key(),
        text: block.text,
        logo: block.logo,
        date: block.date,
      };
    case 'SectionHeader':
      return { _type: 'sectionHeader', _key: key(), text: block.text };
    case 'SubsectionHeader':
      return { _type: 'subsectionHeader', _key: key(), text: block.text };
    case 'Paragraph':
      return { _type: 'paragraph', _key: key(), text: block.text };
    case 'TechStack':
      return {
        _type: 'techStack',
        _key: key(),
        stack: (block.stack || []).map((card) => ({
          _type: 'techCard',
          _key: key(),
          tech: card.tech,
          text: card.text,
        })),
      };
    case 'ProjectImages':
      return {
        _type: 'projectImages',
        _key: key(),
        images: (block.images || []).map((img) => ({
          _type: 'showcaseImage',
          _key: key(),
          src: img.src,
          width: img.width,
          height: img.height,
          alt: img.alt,
        })),
      };
    case 'Link':
      return { _type: 'link', _key: key(), url: block.url, label: block.label };
    default:
      console.warn(`Bloque desconocido omitido: ${block.type}`);
      return null;
  }
}

async function run() {
  const docs = [];
  let topOrder = 0;

  for (const node of tree) {
    if (node.type === 'folder') {
      const folderRoute = node.route || slugify(node.name);
      const folderId = `folder-${folderRoute}`;
      docs.push({
        _id: folderId,
        _type: 'folder',
        name: node.name,
        route: { _type: 'slug', current: folderRoute },
        icon: node.icon,
        order: topOrder,
      });

      (node.content || []).forEach((project, idx) => {
        const slug = slugify(project.name);
        docs.push({
          _id: `project-${slug}`,
          _type: 'project',
          name: project.name,
          slug: { _type: 'slug', current: slug },
          date: project.date,
          icon: project.icon,
          url: project.url,
          category: { _type: 'reference', _ref: folderId },
          order: idx,
          techStack: project.techStack || [],
          deployment: project.deployment || [],
          content: (project.content || []).map(mapBlock).filter(Boolean),
        });
      });
    } else if (node.type === 'pdf') {
      const route = node.route || slugify(node.name);
      docs.push({
        _id: 'cv',
        _type: 'cv',
        name: node.name,
        route: { _type: 'slug', current: route },
        url: node.content,
        order: topOrder,
      });
    } else if (node.type === 'text') {
      const route = node.route || slugify(node.name);
      docs.push({
        _id: `textPage-${route}`,
        _type: 'textPage',
        name: node.name,
        route: { _type: 'slug', current: route },
        markdown: node.content,
        order: topOrder,
      });
    } else {
      console.warn(`Nodo de primer nivel omitido (tipo ${node.type}).`);
    }
    topOrder += 1;
  }

  console.log(`Migrando ${docs.length} documentos a Sanity...`);
  let tx = client.transaction();
  for (const doc of docs) {
    tx = tx.createOrReplace(doc);
  }
  await tx.commit();
  console.log('Migración completada con éxito.');
}

run().catch((err) => {
  console.error('La migración ha fallado:', err);
  process.exit(1);
});
