import styles from './ospdfrenderer.module.css';

export default function OSPdfRenderer({ route }) {
  return (
    <iframe
      style={{
        width: '100%',
        height: '100%',
      }}
      type="application/pdf"
      src={route}
    />
  );
}
