import React from 'react'
import styles from './mypage.module.css'
import Navbar from '../navbar/navbar';
import MyInformation from '../myInformation/myInformation';


export default function Mypage() {
    return (
        <div>
            <Navbar />
            <MyInformation />
        </div>
    )
}
