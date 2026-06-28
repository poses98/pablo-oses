import page from './page-schema';
import project from './project-schema';
import technology from './technology-schema';
import folder from './folder-schema';
import textPage from './textPage-schema';
import cv from './cv-schema';
import blocks from './blocks';

// Document types + object types (bloques de contenido). Los bloques deben
// registrarse para poder referenciarse por `type` dentro del array `content`
// del documento `project`.
const schemas = [
  project,
  folder,
  textPage,
  cv,
  page,
  technology,
  ...blocks,
];

export default schemas;
