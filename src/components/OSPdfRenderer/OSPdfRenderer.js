import styles from './ospdfrenderer.module.css';

export default function OSPdfRenderer({ route }) {
  return (
    <iframe
      style={{
        width: '100%',
        height: '100%',
        border: 0,
        display: 'block',
      }}
      title="Curriculum Vitae"
      type="application/pdf"
      src={route}
    />
  );
}
