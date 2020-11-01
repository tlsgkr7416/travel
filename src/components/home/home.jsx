import React, { useEffect } from 'react'
import styles from './home.module.css';
import Navbar from '../navbar/navbar';
import Menu from '../menu/menu';
import MainItem from '../mainItem/mainItem';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addMember } from '../../data/user/actions';
import { firstItem } from '../../data/items/action';

export default function Home() {
  const items = useSelector(state => state.item);
  const {id} = useParams();
  const dispatch = useDispatch();
  console.log(items);

  useEffect(() => {
     fetch('/home', {
       method: 'POST',
       headers:{
        'Content-Type': 'application/json'
      },
       body: JSON.stringify({id: id}), 
     })
       .then(res => res.json())
       .then((res)=> {
         dispatch(addMember(res.user));
         dispatch(firstItem(res.item));  
         console.log(items,456);
    }); 
  },[]);
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
