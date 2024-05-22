const folder = {
  name: 'folder',
  title: 'Folder',
  type: 'document',
  fields: [
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Projects Folder', value: 'folder' },
          { title: 'PDF', value: 'pdf' },
          { title: 'Option 3', value: 'option3' },
        ],
      },
    },

    {
      name: 'projects',
      title: 'Projects',
      type: 'array',
      hidden: ({ document }: { document: any }) =>
        document?.category !== 'folder',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'project',
            },
          ],
        },
      ],
    },

    {
      name: 'image',
      title: 'Image',
      type: 'image',
      hidden: ({ document }: { document: any }) =>
        document?.category === 'folder',
      description: 'Image of the folder (preferred 320x320px)',
      options: {
        hotspot: true, // Allows customization in studio
      },
    },
  ],
};

export default folder;
