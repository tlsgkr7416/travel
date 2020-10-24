import React from 'react'
import styles from './menu.module.css';

export default function Menu() {
    return (
        <ul className={styles.container}>
           <li>음식</li>
           <li>관광</li>
           <li>인물</li>
           <li>국내</li>
           <li>외국</li>
        </ul>
    )
}
