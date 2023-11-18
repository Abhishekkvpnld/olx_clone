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
  const [Loading, setLoading] = useState(false)

  const [focus, setFocus] = useState({
    errName: false,
    errPhone: false,
    errPassword: false,
    errEmail: false
  })

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
        <div className='loadingSignUp'>
          <HashLoader color="#000000" />
        </div>
        : ""
      }

      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo"></img>
        <form id='form' onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            pattern='^[A-Za-z0-9].{2,16}'
            type="text"
            value={userName}
            onChange={(e) => { setuserName(e.target.value) }}
            id="fname"
            name="name"
            onBlur={() => setFocus({ ...focus, errName: true })}
            focus={focus.errName.toString()}
            required
          />
          <br />
          <span>username should be 3-16 charecters</span>
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
            onBlur={() => setFocus({ ...focus, errEmail: true })}
            focus={focus.errEmail.toString()}
            required
          />
          <br />
          <span>Enter valid Email Id</span>
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
            onBlur={() => setFocus({ ...focus, errPhone: true })}
            focus={focus.errPhone.toString()}
            required
          />
          <br />
          <span>Enter phone number</span>
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            pattern='(?=^.{8,16}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'
            type="password"
            value={Password}
            onChange={(e) => { setPassword(e.target.value) }}
            id="lname"
            name="password"
            onBlur={() => setFocus({ ...focus, errPassword: true })}
            focus={focus.errPassword.toString()}
            required
          />
          <br />
          <span>Password must contain 8 charecters and <br />  include 1 uppercase 1 digit and 1 special charecters </span>
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
