import React, { useState, useRef } from 'react'
import styles from './picture.module.css';
import { Input, Button } from 'semantic-ui-react';
import Navbar from '../navbar/navbar';
import { useDispatch } from 'react-redux';
import { itemAdd } from '../../data/items/action';
import { useHistory } from 'react-router-dom';

export default function Picture() {
    const [information, setInformation] = useState({});
    const [imgFile, setImgFile] = useState(null);
    const imgLabelInput = useRef();
    const dispatch = useDispatch();
    const history = useHistory();
    const [test, setTest] = useState({});
    console.log(information);
    
    const handleClick = async () => {
        const url = process.env.REACT_APP_CLOUDINARY_URL;
        const formData = new FormData();
        formData.append('file', imgFile);
        formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
        
        let response = await fetch(url, {
            method: 'POST',
            body: formData
        });

         const pictureUrl = response.url;
         const result = {...information, pictureUrl};
         dispatch(itemAdd(result));
         setInformation({});
         history.push('/');
    };

    const handleChange = (e) => {
         setInformation({
           ...information,
           [e.target.id]: e.target.value,
         });
        // test.a = 2    같은 객체를 셋에 실행하면 랜더링 안된다. 배열은 push해주면 
        // setTest(test);
    };

    const handleFile = (e) => {
      setImgFile(e.target.files[0]);
      imgLabelInput.current.textContent = "사진이 등록되었습니다.";
    };
  console.log('리랜더링')
    return (
        <React.Fragment>
            <Navbar />
              <ul className={styles.container}>
                <li className={styles.title}><Input id='title' placeholder='제목' onChange={handleChange}/></li>
                <li className={styles.item}>
                  <label for="ex_file" ref={imgLabelInput}>사진 올리기</label>
                  <input type="file" id="ex_file" onChange={handleFile} />
                </li> 
                <li className={styles.content}><Input id='content' placeholder='내용' onChange={handleChange}/></li>
                <div className={styles.buttonContainer}>
                  <Button onClick={handleClick}>확인</Button>
                </div>
              </ul>
        </React.Fragment>
    )
}

