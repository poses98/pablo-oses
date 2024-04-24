import fs from 'node:fs';
import path from 'node:path';

const pdfjsDistPath = path.dirname(
  path.resolve('node_modules/pdfjs-dist/package.json')
);
const pdfjsWorkerPath = path.join(pdfjsDistPath, 'build', 'pdf.worker.min.js');

fs.copyFileSync(pdfjsWorkerPath, 'public/pdf.worker.min.js');
