import OSMarkdown from '../OSMarkdown/OSMarkdown';

export default function OSProjectRenderer({ route }) {
  return (
    <div
      style={{
        backgroundColor: '#fafafa',
        height: '100%',
        padding: '30px',
        overflow: 'scroll',
      }}
    >
      <OSMarkdown route={route} />
    </div>
  );
}
