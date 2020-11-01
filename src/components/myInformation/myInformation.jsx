import React from 'react'
import styles from './myInformation.module.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function MyInformation() {
    const {userId} = useParams();
    const items = useSelector(store => store.item);

    const boardCheck = () => {
        const boardSum = items.filter(value => value.userId === userId);
        return boardSum.length;
    };

    return (
        <div className={styles.container}>
            <i class="far fa-user fa-6x"></i>
            <div className={styles.subContainer}>
                <span className={styles.name}>{userId}</span>
                <div className={styles.subCount}>
                    <span>게시물: {boardCheck()}</span>
                </div>
            </div>
        </div>
    )
}
