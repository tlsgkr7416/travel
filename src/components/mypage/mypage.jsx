import React from 'react'
import styles from './mypage.module.css'
import Navbar from '../navbar/navbar';
import MyInformation from '../myInformation/myInformation';
import MyItemList from '../myItemList/myItemList';


export default function Mypage() {
    return (
        <div className={styles.container}>
            <Navbar />
            <MyInformation />
            <MyItemList />
        </div>
    )
}
