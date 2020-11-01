import React, { useState, useRef } from 'react';
import styles from './mainItem.module.css';
import { Input, Button } from 'semantic-ui-react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { itemUpdate, replyItem } from '../../data/items/action';
import MiniItem from '../miniItem/miniItem';
import Reply from '../reply/reply';
import axios from 'axios';

export default function MainItem({item}) {
    const dispatch = useDispatch();
    const [reply, setReply] = useState(null);
    const {id} = useParams();
    const inputRef = useRef();

    const handleUpdateClick = async () => {
        await fetch('/item/heart', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({itemId: item.itemId, userId: id})
        });

        dispatch(itemUpdate(item.itemId, id));
    };

    const handleReply = (e) => {
        setReply(e.target.value);
    };

     const handleReplyClick = async () => {
            await axios.put('/item/reply', {
              itemId: item.itemId,
              reply: reply,
              id: id,
        });
        
        dispatch(replyItem({...item, replyPeople:[...item.replyPeople, {[id]: reply}]}));
        inputRef.current.value='';
     };

     const heartClickCheck = () => {
        const idCheck = item.heartClickId.filter(value => value === id);
        return idCheck.length === 0 ? 
            <i className={`far fa-heart fa-3x ${styles.heart}`} onClick={handleUpdateClick}></i> :
            <i className={`fas fa-heart fa-3x ${styles.heartClicked}`}></i>             
     };

    return (
        <React.Fragment>
        <ul className={styles.container}>
           <li className={styles.topContainer}>
               <div>{item.userId}</div>
               <div>{item.title}</div>
           </li>
           <li className={styles.pictureContainer}>
               <MiniItem item={item} />
           </li>
           <li className={styles.informationContainer}>
               <div className={styles.heartContainer}>
                 {heartClickCheck()}
                 <div className={styles.heartSum}>좋아요: {item.heart}</div>
               </div>
               <div className={styles.replyContent}>
                   {item.replyPeople.map((value, index) => (
                       <Reply key={index} replyContent={value} />
                   ))}
               </div>
           </li>
           <li className={styles.replyContainer}>
              <input onChange={handleReply} ref={inputRef} placeholder='댓글' />
              <button onClick={handleReplyClick}>확인</button>
           </li>
        </ul>
        </React.Fragment>
    )
}
