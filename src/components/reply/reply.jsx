import React from 'react';
import styles from './reply.module.css';

export default function Reply({replyContent}) {
    const id = Object.keys(replyContent)[0];
    const content = Object.values(replyContent)[0];
    return (
        <div className={styles.container}>
          <span>{id}:</span>
          <span>{content}</span>
        </div>
    )
}
