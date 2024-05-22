import { PortableTextBlock } from 'next-sanity';

export type Technology = {
  _id: string;
  _createdAt: string;
  name: string;
  slug: string;
  image: string;
  description: PortableTextBlock[];
};
