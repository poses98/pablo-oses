import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './osmarkdown.module.css';
import rehypeRaw from 'rehype-raw';

export default function OSMarkdown({ content, route }) {
  const [contentText, setContentText] = useState(content);

  useEffect(() => {
    if (route) {
      fetch(route)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text();
        })
        .then((text) => {
          setContentText(text);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [route, content]);

  return (
    <div className={styles.container}>
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{contentText}</ReactMarkdown>
    </div>
  );
}
