'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  '/pdf.worker.min.js',
  import.meta.url
).toString();

const Document = dynamic(
  () => import('react-pdf').then((module) => module.Document),
  { ssr: false }
);
const Page = dynamic(() => import('react-pdf').then((module) => module.Page), {
  ssr: false,
});

export default function OSPdfRenderer({ route }) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document file={route} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={1} renderAnnotationLayer={false} />
      </Document>
    </div>
  );
}
