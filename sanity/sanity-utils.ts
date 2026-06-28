import { Project } from '../src/types/Project';
import { Page } from '../src/types/Page';
import { createClient, groq } from 'next-sanity';
import { sanityFetch } from './sanity.client';

/* export async function getProjects(): Promise<Project[]> {
  const client = createClient({
    projectId: 'gv7y171m',
    dataset: 'production',
    apiVersion: '2024-05-06',
    useCdn: false,
  });

  return await client.fetch(groq`*[_type == "project"]{
        _id,
        _createdAt,
        name,
        "slug":slug.current,
        "image":image.asset->url,
        url,
        content
    }`);
}
 */

export async function getProjects(): Promise<Project[]> {
  const query = groq`*[_type == "project"]{
    _id,
    _createdAt,
    name,
    "slug":slug.current,
    "image":image.asset->url,
    url,
    content
}`;

  return await sanityFetch<Project[]>({ query: query, tags: ['project'] });
}

export async function getProject(slug: string): Promise<Project> {
  const query = groq`*[_type == "project" && slug.current == $slug][0]{
      _id,
      _createdAt,
      name,
      "slug":slug.current,
      "image":image.asset->url,
      url,
      content
  }`;

  return await sanityFetch<Project>({
    query: query,
    qParams: { slug },
    tags: ['project'],
  });
}

export async function getPages(): Promise<Page[]> {
  const query = groq`*[_type == "page"]{
    _id,
    _createdAt,
    name,
    "slug":slug.current,
    content
  }`;
  return await sanityFetch<Page[]>({ query: query, tags: ['page'] });
}

export async function getPage(slug: string): Promise<Page> {
  const query = groq`*[_type=="page" && slug.current == $slug][0]{
  _id,
  _createdAt,
  name,
  "slug":slug.current,
  content
}`;
  // params go with $param and declared in the second attr of the fetch
  return await sanityFetch<Page>({
    query: query,
    qParams: { slug },
    tags: ['page'],
  });
}

// Nodo genérico del árbol que consume la UI (escritorio, explorador de
// archivos y gestor de ventanas). Tiene la misma forma que cada entrada de
// src/resources/tree.js, de modo que los componentes existentes funcionan sin
// cambios estructurales.
export type TreeNode = {
  name: string;
  type: 'folder' | 'project' | 'pdf' | 'text';
  route: string | null;
  order?: number | null;
  // Para folders es un array de nodos hijos; para project un array de bloques;
  // para pdf/text es un string (URL del PDF o markdown).
  content: any;
  date?: string | null;
  icon?: string | null;
  url?: string | null;
  techStack?: string[] | null;
  deployment?: string[] | null;
};

// Proyección compartida que traduce los bloques tipados de Sanity (camelCase
// en `_type`) al `type` PascalCase que espera el mapa de componentes de
// src/components/OSProjectRenderer/OSProjectRenderer.js.
const projectContentProjection = groq`
  content[]{
    "type": select(
      _type == "projectHeader" => "ProjectHeader",
      _type == "sectionHeader" => "SectionHeader",
      _type == "subsectionHeader" => "SubsectionHeader",
      _type == "paragraph" => "Paragraph",
      _type == "techStack" => "TechStack",
      _type == "projectImages" => "ProjectImages",
      _type == "link" => "Link"
    ),
    text,
    logo,
    date,
    url,
    label,
    "stack": stack[]{ "type": "TechCard", tech, text },
    "images": images[]{ src, width, height, alt }
  }
`;

// Ensambla el árbol completo de contenido desde Sanity con la misma forma que
// src/resources/tree.js: carpetas (con sus proyectos) + CV + páginas de texto,
// todo ordenado por el campo `order` de cada documento de primer nivel.
export async function getTree(): Promise<TreeNode[]> {
  const query = groq`{
    "folders": *[_type == "folder"] | order(order asc){
      "name": name,
      "type": "folder",
      "route": route.current,
      "order": order,
      "content": *[_type == "project" && references(^._id)] | order(order asc){
        "name": name,
        "type": "project",
        "route": slug.current,
        "date": date,
        "icon": icon,
        "url": url,
        "techStack": techStack,
        "deployment": deployment,
        ${projectContentProjection}
      }
    },
    "cvs": *[_type == "cv"] | order(order asc){
      "name": name,
      "type": "pdf",
      "route": route.current,
      "order": order,
      "content": coalesce(url, file.asset->url)
    },
    "textPages": *[_type == "textPage"] | order(order asc){
      "name": name,
      "type": "text",
      "route": route.current,
      "order": order,
      "content": markdown
    }
  }`;

  const result = await sanityFetch<{
    folders: TreeNode[];
    cvs: TreeNode[];
    textPages: TreeNode[];
  }>({
    query,
    tags: ['folder', 'project', 'cv', 'textPage'],
  });

  const nodes: TreeNode[] = [
    ...(result.folders || []),
    ...(result.cvs || []),
    ...(result.textPages || []),
  ];

  // Orden estable de los elementos de primer nivel del escritorio. Los que no
  // tengan `order` se colocan al final, preservando el orden de la consulta.
  return nodes.sort(
    (a, b) =>
      (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER)
  );
}
