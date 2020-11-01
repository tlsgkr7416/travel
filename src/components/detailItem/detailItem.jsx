import React from 'react'
import styles from './detailItem.module.css';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Reply from '../reply/reply';

export default function DetailItem() {
    const {itemId, userId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const item = useSelector((store) => {
        return store.item.filter((value) => value.itemId == itemId)[0];
    });

    const handleDeleteClick = async () => {
        const response = await fetch('/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                redirect: 'follow',
                body: JSON.stringify({itemId: item.itemId, userId: item.userId}),
        })
        
        if (response.redirected) {
            window.location.href = `http://localhost:3000/home/${item.userId}`;
        }
    };


    return (
      <React.Fragment>
        <div className={styles.container}>
            <div className={styles.headContainer}>
                <span className={styles.id}>{item.userId}님</span>
                <span className={styles.title}>{item.title}</span>
                {item.userId === userId ? (<ul className={styles.selectContainer}>
                   <li><Link to={`/picture/${item.itemId}`} style={{ textDecoration: 'none', color: 'black' }}>수정</Link></li>
                   <li onClick={handleDeleteClick}>삭제</li> 
                </ul>) : null}
            </div>
            <div className={styles.mainContainer}>
                <ul className={styles.subContainer}>
                  <div className={styles.pictureContainer}><img src={item.pictureUrl} /></div>
                  <div className={styles.contentContainer}>{item.content}</div>
                </ul>
                <div className={styles.replyContainer}>
                   {item.replyPeople.map((value, index) => (
                        <Reply key={index} replyContent={value} />
                   ))}
                </div>
            </div>
        </div>
        <button className={styles.check} onClick={() => {history.goBack()}}>확인</button>
      </React.Fragment>
    )
}
