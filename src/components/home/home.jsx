import React from 'react'
import styles from './home.module.css';
import Navbar from '../navbar/navbar';
import Menu from '../menu/menu';
import MainItem from '../mainItem/mainItem';
import { useSelector } from 'react-redux';

export default function Home() {
  const items = useSelector(state => state.item);

    return (
        <div>
          <Navbar />
          <div className={styles.mainContainer}>
            <Menu />
            <div className={styles.itemContainer}>
              {items.map((item, index) => (
                item.isCheck ? <MainItem key={index} item={item}/> : null
              ))}
            </div>
          </div>
        </div>
    )
}
