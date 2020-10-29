import React, { useState, useRef, useEffect} from 'react'
import styles from './picture.module.css';
import { Input, Button } from 'semantic-ui-react';
import Navbar from '../navbar/navbar';
import { useDispatch, useSelector } from 'react-redux';
import { itemAdd } from '../../data/items/action';
import { useHistory, useParams } from 'react-router-dom';

export default function Picture() {
    const [information, setInformation] = useState({});
    const [imgFile, setImgFile] = useState(null);
    const imgLabelInput = useRef();
    const dispatch = useDispatch();
    const history = useHistory();
    const [test, setTest] = useState({});
    const {itemId} = useParams();
    const userId = useSelector((state) => state.user._id)

    const handleClick = async () => {       
        const url = process.env.REACT_APP_CLOUDINARY_URL;
        const formData = new FormData();
        formData.append('file', imgFile);
        formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
        
        let response = await fetch(url, {
            method: 'POST',
            body: formData
        }).then((response) => response.json());
        
         const pictureUrl = response.url;
         const result = {...information, pictureUrl, itemId: Number(itemId) || Date.now(), heart: 0, isCheck: true, userId};
         
         dispatch(itemAdd(result));

         if (!itemId) {
         let response = await fetch('/item', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(result)
          }).then((res) => res.json());
         } else {
          await fetch('/item', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(result)
          }).then(res => res.json())
         }
         setInformation({});
         history.push(`/home/${userId}`);
    };

    const handleChange = (e) => {
         setInformation({
           ...information,
           [e.target.id]: e.target.value,
         });
    };

    const handleFile = (e) => {
      setImgFile(e.target.files[0]);
      imgLabelInput.current.textContent = "사진이 등록되었습니다.";
    };

    const handleSelect = (e) => {
      setInformation({
        ...information,
        kind: e.target.value,
      });
    };

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
                <select onChange={handleSelect}>
                  <option value="관광">관광</option>
                  <option value='인물'>인물</option>
                  <option value="국내">국내</option>
                  <option value="외국">외국</option>  
                </select>
                <div className={styles.buttonContainer}>
                  <Button onClick={handleClick}>확인</Button>
                </div>
              </ul>
        </React.Fragment>
    )
}

