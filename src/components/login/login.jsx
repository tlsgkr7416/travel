import React from 'react'
import styles from './login.module.css';
import { Input, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function Login() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>여행가자</h1>
            <div className={styles.loginContainer}>
               <Input placeholder='아이디' className={styles.item}/>
               <Input type='password' placeholder='비밀번호' className={styles.item} />
               <div className={styles.buttonContainer}>
                  <Button>로그인</Button>
                  <Button><Link to='/membership'>회원가입</Link></Button>
               </div>
            </div>
        </div>
    )
}
