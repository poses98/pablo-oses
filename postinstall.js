const fs = require('fs');
const path = require('path');

const pdfjsDistPath = path.dirname(
  path.resolve('node_modules/pdfjs-dist/package.json')
);
const pdfjsWorkerMinPath = path.join(
  pdfjsDistPath,
  'build',
  'pdf.worker.min.js'
);
const pdfjsWorkerPath = path.join(pdfjsDistPath, 'build', 'pdf.worker.js');

fs.copyFileSync(pdfjsWorkerMinPath, 'public/pdf.worker.min.js');
fs.copyFileSync(pdfjsWorkerPath, 'public/pdf.worker.js');
