import { copyPaste } from '@superside-oss/sanity-plugin-copy-paste';
import { defineField } from 'sanity';

const page = {
  name: 'page',
  title: 'Pages',
  type: 'document',
  fields: [
    defineField(copyPaste),
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
};

export default page;
