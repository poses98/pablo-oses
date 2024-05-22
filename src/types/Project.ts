import { PortableTextBlock } from 'next-sanity';
import { Technology } from './Technology';

export type Project = {
  _id: string;
  _createdAt: string;
  name: string;
  slug: string;
  image: string;
  url: string;
  content: PortableTextBlock[];
  publishedAt: string;
  technologies: Technology[];
  productImages: string[];
  tags: string[];
};
