import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import schemas from './sanity/schemas';
import { copyPastePlugin } from '@superside-oss/sanity-plugin-copy-paste';

const config = defineConfig({
  projectId: 'gv7y171m',
  dataset: 'production',
  title: 'Sanity Studio Playground',
  apiVersion: '2024-05-06',
  basePath: '/admin',
  plugins: [structureTool(), copyPastePlugin()],
  schema: { types: schemas },
});

export default config;
