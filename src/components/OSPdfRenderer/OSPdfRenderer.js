import styles from './ospdfrenderer.module.css';

export default function OSPdfRenderer({ route }) {
  return (
    <embed
      style={{
        width: '100%',
        height: '100%',
      }}
      type="application/pdf"
      src={route}
    />
  );
}
