import React from 'react'
import styles from './myInformation.module.css';

export default function MyInformation() {
    return (
        <div className={styles.container}>
            <i class="far fa-user fa-6x"></i>
            <div className={styles.subContainer}>
                <span className={styles.name}>강신학</span>
                <div className={styles.subCount}>
                    <span>게시물:</span>
                    <span>좋아요:</span>
                </div>
            </div>
        </div>
    )
}
