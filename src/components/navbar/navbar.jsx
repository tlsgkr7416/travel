import React, { useState } from 'react';
import styles from './navbar.module.css';
import { Input, Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { searchItem, kindItem} from '../../data/items/action';

export default function Navbar() {
   const history = useHistory();
   const userId = useSelector(store => store.user._id);
   const dispatch = useDispatch();
   const [search, setSearch] = useState(null);
   
   const handleClick = (event) => {
      switch (event.target.textContent) {
         case '여행가자':
            dispatch(kindItem('모두'));  
            return history.push(`/home/${userId}`);
         case '글쓰기':
            return history.push('/picture');
         default: 
            return history.push('/mypage');
      };
   };

   const handleSearch = (event) => {
       setSearch(event.target.value);
   };

   const handleSearchClick = () => {
       dispatch(searchItem(search));
   };

   return (
        <ul className={styles.container}>
           <li className={styles.leftContent} onClick={handleClick}>여행가자</li>
           <li className={styles.searchContainer}>
              <Input placeholder='Search...' onChange={handleSearch}/>
              <Button onClick={handleSearchClick}>Click Here</Button>
           </li>
           <li className={styles.rightContainer}>
              <span><i className="fas fa-heart fa-3x"></i></span>
              <span><i className="fas fa-user fa-3x" onClick={handleClick}></i></span>
              <span onClick={handleClick}>글쓰기</span>
              <span>로그아웃</span>
           </li>
        </ul>
   )
}
