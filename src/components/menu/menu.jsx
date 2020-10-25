import React from 'react'
import styles from './menu.module.css';
import { useDispatch } from 'react-redux';
import { kindItem } from '../../data/items/action';

export default function Menu() {
    const dispatch = useDispatch();

    const handleClick = (e) => {
        dispatch(kindItem(e.target.textContent));
    }

    return (
        <ul className={styles.container}>
           <li onClick={handleClick}>모두</li>
           <li onClick={handleClick}>관광</li>
           <li onClick={handleClick}>인물</li>
           <li onClick={handleClick}>국내</li>
           <li onClick={handleClick}>외국</li>
        </ul>
    )
}
