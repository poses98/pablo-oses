// Object types reutilizables que componen el contenido de un proyecto.
// Cada uno se corresponde con un componente del renderer
// (src/components/OSProjectRenderer). Se registran en el schema global para
// poder usarse dentro del array `content` del documento `project`.
import projectHeader from './projectHeader';
import sectionHeader from './sectionHeader';
import subsectionHeader from './subsectionHeader';
import paragraph from './paragraph';
import techCard from './techCard';
import techStack from './techStack';
import projectImages, { showcaseImage } from './projectImages';
import link from './link';

const blocks = [
  projectHeader,
  sectionHeader,
  subsectionHeader,
  paragraph,
  techCard,
  techStack,
  projectImages,
  showcaseImage,
  link,
];

export default blocks;
