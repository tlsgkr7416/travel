import styles from './membership.module.css';
import { Input, Button } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addMember } from '../../data/user/actions';
import React, { useState } from 'react';


export default function Membership() {
    const [information, setInformation] = useState({});
    const dispatch = useDispatch();
    const histopy = useHistory();   //let email, id, name등 그냥 설정하면 안좋나?

    const handleClick = (e) => {
        console.log(information);   
        dispatch(addMember(information));
        histopy.push('/login');
    };
    
    const handleChange = (e) => {
         setInformation({
             ...information,
             [e.target.id]: e.target.value,
         });
    }

    return (
    <div className={styles.container}>
        <h1 className={styles.title}>여행가자</h1>
        <div className={styles.signContainer}>
           <Input placeholder='이메일' id='email' className={styles.item} onChange={handleChange} />
           <Input placeholder='성명' id='name' className={styles.item} onChange={handleChange}/>
           <Input placeholder='아이디' id='id' className={styles.item} onChange={handleChange}/>
           <Input type='password' placeholder='비밀번호' id='password' className={styles.item} onChange={handleChange}/>
           <div className={styles.buttonContainer}>
              <Button onClick={handleClick}>회원가입</Button>
           </div>
        </div>
    </div>
    )
}
