import React,{useState,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../../store/Context';
import Logo from '../../olx-logo.png';
import './Login.css';
import { getAuth,signInWithEmailAndPassword} from "firebase/auth"
import 'firebase/firestore'

function Login() {
const [Email,setEmail]=useState('')
const [Password,setPassword]=useState('')
const {firebaseApp} = useContext(FirebaseContext)
const navigate = useNavigate()
const auth=getAuth(firebaseApp)

const handleLogin=(e)=>{
e.preventDefault()
signInWithEmailAndPassword(auth,Email,Password).then(()=>{
navigate('/')
alert('login success')
}).catch((error)=>{
  alert(error.message)
})
}
const handlePage=()=>{
  navigate('/signup')
}

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            value={Email}
            onChange={(e)=>{setEmail(e.target.value)}}
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
            onChange={(e)=>{setPassword(e.target.value)}}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={handlePage}>Signup</a>
      </div>
    </div>
  );
}

export default Login;