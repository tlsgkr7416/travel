import React, { useState } from 'react';
import styles from './navbar.module.css';
import { Input, Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { searchItem, kindItem} from '../../data/items/action';
import axios from 'axios';

export default function Navbar() {
   const history = useHistory();
   const userId = useSelector(store => store.user._id); //id값만 변해야 실행되나.
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
            return history.push(`/mypage/${userId}`);
      };
   };

   const handleSearch = (event) => {
       setSearch(event.target.value);
   };

   const handleSearchClick = () => {
       dispatch(searchItem(search));
       //history.push(`/home/${userId}`);
       console.log(search);
   };

   const handleLogout = () => {     //실행순서 이상함 value도 두번 클릭하면 null로 나옴
      axios.get('/logout', {}
     ).then(() => {
        window.location.href = 'http://localhost:3000/'
      })
   }

      return (
        <ul className={styles.container}>
           <li className={styles.leftContent} onClick={handleClick}>여행가자</li>
           <li className={styles.searchContainer}>
              <Input placeholder='Search...' value={search} onChange={handleSearch}/>
              <Button onClick={handleSearchClick}>Click Here</Button>
           </li>
           <li className={styles.rightContainer}>
              <span><i className="fas fa-user fa-3x" onClick={handleClick}></i></span>
              <span onClick={handleClick}>글쓰기</span>
              <span onClick={handleLogout}>로그아웃</span>
           </li>
        </ul>
   )
}
