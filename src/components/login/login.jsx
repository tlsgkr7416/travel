import React from 'react'
import styles from './login.module.css';
import { Input, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function Login() {

    const handleSubmit = (e) => {
        e.preventdefault();
    }
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>여행가자</h1>
            <form action='/login' method='POST'>
            <div className={styles.loginContainer}>
               <Input placeholder='아이디' className={styles.item} name='id'/>
               <Input type='password' placeholder='비밀번호' className={styles.item} name='password'/>
               <div className={styles.buttonContainer}>
                  <Button style={{ color: 'black' }}>로그인</Button>
                  <Button><Link onSubmit={handleSubmit} to='/membership' style={{ textDecoration: 'none', color: 'black' }}>회원가입</Link></Button>
               </div>
            </div>
            </form>
        </div>
    )
}
