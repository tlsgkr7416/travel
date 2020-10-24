import React from 'react'
import styles from './mainReply.module.css'

export default function MainReply() {
    return (
        <ul className={styles.container}>
            <li className={styles.title}>제목:</li>
            <li className={styles.picture}>사진</li>
            <li className={styles.reply}>댓글</li>
        </ul>
    )
}
