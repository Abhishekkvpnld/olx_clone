import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../../store/Context';
import Logo from '../../olx-logo.png';
import './Login.css';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import 'firebase/firestore'
import DotLoader from "react-spinners/DotLoader";

function Login() {

  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [Loading, setLoading] = useState(false)

  const { firebaseApp } = useContext(FirebaseContext)
  const navigate = useNavigate()
  const auth = getAuth(firebaseApp)

  const handleLogin = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, Email, Password).then(() => {
      navigate('/')
      alert('login success')
    }).catch((error) => {
      alert(error.message)
    })
  }
  const handlePage = () => {
    navigate('/signup')
  }

  const loading = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 5000)

  }

  return (
    <div>

      {Loading ?
      <div  className='loading'>
     <DotLoader color="#0000FF" />
      </div>
    :""
  }

     

      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            value={Email}
            onChange={(e) => { setEmail(e.target.value) }}
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
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
          <button onClick={loading}>Login</button>
        </form>
        <a onClick={handlePage}>Signup</a>
      </div>




    </div>
  );
}

export default Login;