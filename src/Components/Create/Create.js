import React, { Fragment,useState,useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {AuthContext,FirebaseContext} from '../../store/Context'
import {getStorage,ref,uploadBytes,getDownloadURL} from 'firebase/storage'
import {getFirestore, collection, addDoc} from 'firebase/firestore'
import { onAuthStateChanged, getAuth } from 'firebase/auth';

const Create = () => {

const [Name,setName]= useState('')
const [Category,setCategory]=useState('')
const [Price,setPrice]= useState('')
const [Image,setImage]= useState('')
const storage =getStorage()

const { firebaseApp } = useContext(FirebaseContext);
const firestore = getFirestore(firebaseApp);
const {user} =useContext(AuthContext)
const auth =getAuth(firebaseApp)

const handleSubmit=(e)=>{
  e.preventDefault()
  // firebase.storage().ref(`/Image/${Image.name}`).put(Image).then((ref)=>{
  //   ref.getDownloadURl().then((url)=>{
  //     console.log(url)
  //   })
  // })
  onAuthStateChanged(auth, (user) => {const userId =user.uid

  const storageRef= ref(storage, `Image/${Image.name}`)
  uploadBytes(storageRef,File).then((snapShot)=>{
    getDownloadURL(storageRef).then((url) => {
      console.log(url);
      addDoc(collection(firestore, 'products'), {
        Name,
        Category,
        Price,
        url,
        userId,
        createdAt:new Date().toDateString()
       })
    })
  })
})
}

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={Name}
              onChange={(e)=>{
                   setName(e.target.value)
              }}
             required
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={Category}
              onChange={(e)=>{
                setCategory(e.target.value)
              }}
              required
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price" required value={Price} onChange={(e)=>{setPrice(e.target.value)}}/>
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={Image ? URL.createObjectURL(Image) : null} ></img>
          <form>
            <br />
            <input type="file" required  onChange={(e)=>{setImage(e.target.files[0])}}/>
            <br />
            <button className="uploadBtn" onClick={handleSubmit}>upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
