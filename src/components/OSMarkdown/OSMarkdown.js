import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './osmarkdown.module.css';

export default function OSMarkdown({ content }) {
  return (
    <div className={styles.container}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
