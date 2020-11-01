import React, { useEffect, useState } from 'react'
import styles from './myItemList.module.css';
import MiniItem from '../miniItem/miniItem';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function MyItemList() {
    const userId = useSelector((store) => store.user._id);
    const [items, setItems] = useState([]);
    
    useEffect(() => {
        axios.get('/mypage/itemList', {
            params: {userId},
        }).then((response) => setItems(response.data));
    },[]);

    return (
        <div className={styles.container}>
            {items.map((item) => (
                <MiniItem item={item} key={item.itemId}/>
            ))}
        </div>
    );
}