import styles from './membership.module.css';
import { Input, Button } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addMember } from '../../data/user/actions';
import React, { useState } from 'react';


export default function Membership() {
    const [information, setInformation] = useState({});
    const dispatch = useDispatch();
    const histopy = useHistory();   

    const handleClick = (e) => {  
        
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
        <form action='/membership' method="POST">
        <div className={styles.signContainer}>
           <Input placeholder='이메일' id='email' name='email' className={styles.item} onChange={handleChange} />
           <Input placeholder='성명' id='name' name='name' className={styles.item} onChange={handleChange}/>
           <Input placeholder='아이디' id='id' name='id' className={styles.item} onChange={handleChange}/>
           <Input type='password' placeholder='비밀번호' name='password' id='password' className={styles.item} onChange={handleChange}/>
           <div className={styles.buttonContainer}>
              <Button onSubmit={handleClick}>회원가입</Button>
           </div>
        </div>
        </form>
    </div>
    )
}
