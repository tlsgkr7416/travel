import React from 'react';
import styles from './mainItem.module.css';
import { Input, Button } from 'semantic-ui-react'

export default function MainItem({item}) {
    return (
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
                 <i className="fas fa-heart fa-3x"></i>
                 <div>좋아요: 20</div>
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
    )
}
