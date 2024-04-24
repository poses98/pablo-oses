const path = require('path');
const fs = require('fs');

const pdfjsDistPath = path.dirname(require.resolve('pdfjs-dist/package.json'));
const pdfWorker = path.join(pdfjsDistPath, 'build', 'pdf.worker.min.js');

fs.copyFileSync(pdfWorker, './public/js/pdf.worker.min.js');
