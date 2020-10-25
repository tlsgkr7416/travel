import React from 'react';
import styles from './mainItem.module.css';
import { Input, Button } from 'semantic-ui-react'
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { itemDelete, itemUpdate } from '../../data/items/action';

export default function MainItem({item}) {
    const dispatch = useDispatch();

    const handleDeleteClick = () => {
        dispatch(itemDelete(item.id));
    };

    const handleUpdateClick = () => {
        dispatch(itemUpdate(item.id))
    }

    return (
        <React.Fragment>
        <div className={styles.updateContaier}>
            <span className={styles.update}><Link to={`/picture/${item.id}`}>수정</Link></span>
            <sapn className={styles.delete} onClick={handleDeleteClick}>삭제</sapn>
        </div>
        <ul className={styles.container}>
           <li className={styles.topContainer}>
               <div>아이디</div>
               <div>{item.title}</div>
           </li>
           <li className={styles.pictureContainer}>
               <img src={item.pictureUrl}/>
           </li>
           <li className={styles.informationContainer}>
               <div className={styles.heartContainer}>
                 <i className={`fas fa-heart fa-3x ${styles.heart}`} onClick={handleUpdateClick}></i>
                 <div>좋아요: {item.heart}</div>
               </div>
               <div className={styles.replyContent}>
                   tls7416:안녕하세요
               </div>
           </li>
           <li className={styles.replyContainer}>
              <Input placeholder='댓글' />
              <Button>확인</Button>
           </li>
        </ul>
        </React.Fragment>
    )
}
