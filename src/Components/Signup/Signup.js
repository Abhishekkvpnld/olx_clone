import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import HashLoader from "react-spinners/HashLoader";

export default function Signup() {
  const [userName, setuserName] = useState('');
  const [Email, setEmail] = useState('');
  const [PhoneNo, setPhoneNo] = useState('');
  const [Password, setPassword] = useState('');
  const [Loading,setLoading]=useState(false)

  const { firebaseApp } = useContext(FirebaseContext);
  const navigate = useNavigate();
  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);

  const handleSubmit = (e) => {
    
    e.preventDefault();
    createUserWithEmailAndPassword(auth, Email, Password)
      .then((results) => {
        updateProfile(auth.currentUser, { displayName: userName })
          .then(() => {
            addDoc(collection(firestore, 'user'), {
              id: results.user.uid,
              username: userName,
              phone: PhoneNo
             })
              .then(() => {
                navigate('/login');
              });

          })

      })

  }
  const loading = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 5000)

  }

  const handlePage = () => {
    navigate('/login');
  }

  return (
    <div>
      {Loading ?
      <div  className='loadingSignUp'>   
<HashLoader color="#0000FF" />
      </div>
    :""
  }

      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo"></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={userName}
            onChange={(e) => { setuserName(e.target.value) }}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={Email}
            onChange={(e) => { setEmail(e.target.value) }}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={PhoneNo}
            onChange={(e) => { setPhoneNo(e.target.value) }}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={Password}
            onChange={(e) => { setPassword(e.target.value) }}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button onClick={loading}>Signup</button>
          <div className='login'>
        <a onClick={handlePage}>Login</a>
        </div>
        </form>
      </div>
    </div>
  );
}
