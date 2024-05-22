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
    content,
    publishedAt,
    technologies[]->{
      name,
      "slug":slug.current,
      "image":image.asset->url,
      description
    }
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
      content,
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

export async function getFolder(slug: string): Promise<any> {
  const query = groq`*[_type=="folder" && slug.current == $slug][0]{
  _id,
  _createdAt,
  name,
  "slug":slug.current,
  category,
  projects[]->{
    _id,
    name,
    "slug":slug.current,
    "image":image.asset->url,
    url,
    content,
    publishedAt,
    technologies[]->{
      name,
      "slug":slug.current,
      "image":image.asset->url,
      description
    }
  },
  image{
    asset->{
      url
    }
  }
}`;
  // params go with $param and declared in the second attr of the fetch
  return await sanityFetch<any>({
    query: query,
    qParams: { slug },
    tags: ['folder'],
  });
}

export async function getFolders(): Promise<any> {
  const query = groq`*[_type=="folder"]{
  _id,
  _createdAt,
  name,
  "slug":slug.current,
  category,
  image{
    asset->{
      url
    }
  },
  projects[]->{
    _id,
    name,
    "slug":slug.current,
    "image":image.asset->url,
    url,
    content,
    publishedAt,
    technologies[]->{
      name,
      "slug":slug.current,
      "image":image.asset->url,
      description
    }
  }

}`;
  return await sanityFetch<any[]>({ query: query, tags: ['folder'] });
}
