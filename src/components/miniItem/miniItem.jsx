import React from 'react'
import styles from './miniItem.module.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function MiniItem({item}) {
    const userId = useSelector(store => store.user._id);
    return (
        <div className={styles.container}>
            <Link to={`/detailItem/${item.itemId}/${userId}`}><img src={item.pictureUrl} /></Link>
        </div>
    )
}
