'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './ospdfrenderer.module.css';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import PDFToolbar from '../PDFToolbar/PDFToolbar';

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

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
  });

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document
        file={route}
        className={styles.container}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page
          className={styles.pdfFile}
          style={{ heigth: '10px' }}
          pageNumber={1}
          renderAnnotationLayer={false}
        />
      </Document>
    </div>
  );
}
